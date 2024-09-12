<?php

namespace App\Http\Controllers\Users;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Coupon;
use App\Mail\EmailVerify;
use App\Mail\PasswordReset;
use App\Traits\SlugTrait;
use App\Traits\ResponseTrait;
use App\Traits\EncryptionTrait;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\URL;
use App\Notifications\ResetPassword;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use App\Http\Controllers\Static\SettingController;

class AuthController {
    use ResponseTrait , SlugTrait , EncryptionTrait;

    public $allowableEmails = ['@gmail.com' , '@outlook.com' , '@yahoo.com' , '@hotmail.com'];

    /**
     * login method
     */
    public function LoginAuth(){
        try{
            $credential = request()->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            $token = auth()->attempt($credential);

            if (!$token) {
                throw new \Exception('bad credentials' , 1);
            }

            $user = auth()->user();

            // check if user has been blocked
            if($user->block()->where('expire_date' , '>=' , Carbon::now())->first())
                throw new \Exception('user has been blocked' , 22);

            $user['token'] = $token;
            $user['money'] = $this->decrypt($user->money);

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(1001 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * register method
     */
    public function RegisterAuth () {
        try{
            $data = request()->validate([
                'name' => 'required|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'max:11|required' ,
                'whatsapp' => 'max:11' ,
                'password' => 'required',
                'password_confirmation' => 'required|same:password',
                'store_title' => 'max:255',
                'is_vendor' => 'nullable|boolean',
            ]);

            // other validations
            $this->HelperValidationMethodAuth();
            if(request('phone') && User::whereIn('phone' , [request('phone')] )->orWhereIn('whatsapp' , [request('phone')])->first()) throw new \Exception('phone number is already exits' , 4);
            if(request('whatsapp') && User::whereIn('phone' , [request('whatsapp')] )->orWhereIn('whatsapp' , [request('whatsapp')])->first()) throw new \Exception('phone number is already exits' , 4);


            $data['password'] = bcrypt(request('password'));

            $user = User::create($data + [
                'store_title_slug' => $this->CreateSlug(request('store_title'))
            ]);

            // update users count in setting table
            (new SettingController)->UpdateSetting('users_count');
            if(request('is_vendor'))
                (new SettingController)->UpdateSetting('stores_count');

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(1002 , $e->getCode() , $e->getMessage());
        }
    }

    /**
     * logout method
     */
    public function LogoutAuth() {
        try{
            request()->validate(['token' => 'required']);

            $token = auth()->setToken(request('token'));

            if($token) $token->logout();

            return $this->SuccessResponse();
        }catch(\Exception $e) {
            return $this->ErrorResponse(1003 , $e->getCode() , $e->getMessage());
        }
    }



    /**
     * get user data from token
     */
    public function GetUserDataAuth(){
        try{
            // update users visits in setting table
            (new SettingController)->UpdateSetting('visitors_count');

            $data = request()->validate(['token' => 'required']);

            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);

            // check if user has been blocked
            if($user->block()->where('expire_date' , '>=' , Carbon::now())->first())
                throw new \Exception('user has been blocked' , 22);

            $user['money'] = $this->decrypt($user->money);
            $user['token'] = request('token');

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(1004 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * update user data
     */
    public function UpdateAuth(){
        try{
            $data = request()->validate([
                'token' => 'required',
                'email' => 'max:255|email',
                'name' => 'max:255|filled' ,
                'phone' => 'max:11|filled' ,
                'whatsapp' => 'max:11|filled' ,
                'store_title' => 'max:255|filled',
                'the_password' => 'required|min:8',
                'new_password' => 'min:8',
                'password_confirmation' => [Rule::requiredIf(request('new_password') != null),'same:new_password'],
            ]);

            // get user form database
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);

            // check password
            if(!Hash::check(request('the_password'), $user->password)) throw new \Exception('wrong user password' , 27);

            // validations and checking if phone or whatsapp number exiting before for other users
            $this->HelperValidationMethodAuth();
            if(request('phone')) {
                $phone = request('phone');
                $found = User::whereNot('id' , $user->id)->where(function ($query) use($phone) {
                    $query->whereIn('phone' , [$phone] )->orWhereIn('whatsapp' , [$phone]);
                })->first();
                if($found) throw new \Exception('phone number is already exits' , 4);
            }
            if(request('whatsapp')) {
                $whatsapp = request('whatsapp');
                $found = User::whereNot('id' , $user->id)->where(function ($query) use($whatsapp) {
                    $query->whereIn('phone' , [$whatsapp] )->orWhereIn('whatsapp' , [$whatsapp]);
                })->first();
                if($found) throw new \Exception('phone number is already exits' , 4);
            }

            // update store title slug
            if(request('store_title'))
                $data['store_title_slug'] = $this->CreateSlug(request('store_title'));

            if(request('new_password'))
                $data['password'] = request('new_password');

            $user->update($data);

            $user['money'] = $this->decrypt($user->money);
            $user['token'] = request('token');

            return $this->SuccessResponse($user);
        }catch(\Exception $e){
            return $this->ErrorResponse(1005 , $e->getCode() , $e->getMessage());
        }
    }


    /**
     * reset Password email
     * token expiration time updated to 60 minute in @file config/auth.php : password => user => expire
     */
    public function passwordForgetAuth(){
        try{
            request()->validate(['email' => 'required']);

            $user = User::where('email' , request('email'))->first();

            if(!$user) throw new \Exception('email not found' , 6);

            // check if user has been blocked
            if($user->block()->where('expire_date' , '>=' , Carbon::now())->first())
                throw new \Exception('user has been blocked' , 22);

            $token = Password::createToken($user);

            $url = env('APP_URL') . '/auth/password/reset?token=' . $token . '&email=' . $user->email;

            // sending email
            Mail::to($user)->send(new PasswordReset($url , $user->name));

            $user->password_reset_token = $token;

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:1006 , msg: $e->getMessage() , msg_code:$e->getCode());
        }
    }



    /**
     * method that check the token and user_email and password before resetting the password
     * method delete token after user updated
     */
    public function passwordResetAuth(){
        try{
            request()->validate([
                'email' => 'required' ,
                'token' => 'required' ,
                'password' => 'required|max:255|confirmed|min:8' ,
                'password_confirmation' => 'required|max:255' ,
            ]);

            $user = Password::getUser(request()->only('email', 'password', 'password_confirmation', 'token'));

            $tokenIsValid = Password::tokenExists($user, request('token'));

            if(!$tokenIsValid) throw new \Exception('error in validation' , 7);

            $user->password = bcrypt(request()->input('password'));

            $user->save();

            Password::deleteToken($user);

            return $this->SuccessResponse();
        }catch(\Exception $e){
            return $this->ErrorResponse(code:1007 ,msg: $e->getMessage() , msg_code:$e->getCode());
        }
    }


    /**
     * @code : 1008
     * email validation
     * sending an email to user to validate his email
     */
    public function emailValidationAuth(){
        try{
            request()->validate([
                'token' => 'required'
            ]);

            // check if user is exists
            $user = auth()->setToken(request('token'))->user();
            if(!$user) throw new \Exception('bad token' , 5);

            if($user->email_verified_at) throw new \Exception('email is already verified' , 30);

            $temp_url = URL::temporarySignedRoute(
                'emailverify' ,
                now()->addMinutes(60) ,
                ['id' => $user->id , 'hash' => sha1($user->email)]
            );

            Mail::to($user)->send(new EmailVerify($temp_url , $user));

            return $this->SuccessResponse();
        }catch(\Exception $e) {
            return $this->ErrorResponse(code:1008 ,msg: $e->getMessage() , msg_code:$e->getCode());
        }
    }


    /**
     * @code : 1009
     * checking temporary url to verify email
     * set user email to be verified
     */
    public function CheckEmailVerifyTempUrlAuth($id , $hash){
        try{
            $expires = $_GET['expires'];
            if(!URL::hasValidSignature(request()) || Carbon::createFromTimestamp($expires) < Carbon::now()){
                return view('EmailVerify.Fail');
            }

            $user = User::find($id);
            $email_hashed = sha1($user->email);

            if($email_hashed != $hash)
                return view('EmailVerify.Fail');

            $user->email_verified_at = (new Carbon())->now();
            $user->save();

            return view('EmailVerify.Success' , ['user' => $user]);
        }catch(\Exception $e){
            return view('EmailVerify.Fail');
        }
    }




    /**
     * helper validation method
     */
    public function HelperValidationMethodAuth () {
            // check if email is fake
            if(request('email') && !in_array('@' . explode('@' , request('email'))[1] , $this->allowableEmails))
                throw new \Exception('email is fake' , 2);

            if(request('email') && User::where('email' , request('email'))->first()) throw new \Exception('email already exists' , 3);
            if(request('store_title') && User::where('store_title' , request('store_title'))->first()) throw new \Exception('store title is repeated' , 28);
    }
}

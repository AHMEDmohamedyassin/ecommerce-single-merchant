<?php

namespace App\Http\Controllers\Users;

use App\Exceptions\CustomException;
use Carbon\Carbon;
use App\Models\User;
use App\Mail\EmailVerify;
use App\Mail\PasswordReset;
use App\Traits\SlugTrait;
use App\Traits\ResponseTrait;
use App\Traits\EncryptionTrait;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class AuthController {
    use ResponseTrait , SlugTrait , EncryptionTrait;

    public $allowableEmails = ['@gmail.com' , '@outlook.com' , '@yahoo.com' , '@hotmail.com'];

    /**
     * login method
     */
    public function LoginAuth(){
        try{
            request()->validate([
                'phoneORemail' => 'required',
                'password' => 'required|string'
            ]);

            // check if provided filed is email or phone
            $field = filter_var(request('phoneORemail'), FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

            // create token 
            $token = auth()->attempt([
                $field => request('phoneORemail') ,
                'password' => request('password')
            ]);

            // chekc if token is created and credentials is correct
            if (!$token) {
                throw new CustomException('bad credentials' , 1);
            }

            // get user data
            $user = auth()->user();

            // check if user has been blocked
            if($user->block()->where('expire_date' , '>=' , Carbon::now())->first())
                throw new \Exception('user has been blocked' , 2);

            // adding token to response
            $user['token'] = $token;

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
                'name' => 'required|max:255|string',
                'email' => 'required|email|max:255|unique:users',
                'phone' => 'max:11|required|string|unique:users' ,
                'password' => 'required|string|min:8',
                'password_confirmation' => 'required|same:password',
            ]);

            // other validations
            $this->HelperValidationMethodAuth();

            $slug = $this->MultiTextSlug(request('phone') , request('name') , request('email'));

            $user = User::create($data + [
                'slug' => $slug
            ]);

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
            $token = auth()->setToken(request('token'));

            $token->logout();

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
            // (new SettingController)->UpdateSetting('visitors_count');

            $user = request('user');

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
                'email' => 'max:255|email|unique:users',
                'name' => 'max:255' ,
                'password' => 'required|min:8',
                'phone' => 'max:11|unique:users' ,
                'new_password' => 'min:8',
                'password_confirmation' => [Rule::requiredIf(request('new_password') != null),'same:new_password'],
            ]);


            // get user form database
            $user = request('user');

            // check password
            if(!Hash::check(request('password'), $user->password)) 
                throw new CustomException('wrong user password' , 5);

            // validations and checking if phone or whatsapp number exiting before for other users
            $this->HelperValidationMethodAuth();

            if(request('new_password'))
                $data['password'] = request('new_password');

            $user->update($data);

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
            request()->validate(['phoneORemail' => 'required']);

            // check if provided filed is email or phone
            $field = filter_var(request('phoneORemail'), FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

            $user = User::where($field , request('phoneORemail'))->first();

            if(!$user) throw new CustomException('email or phone not found' , 6);

            $token = Password::createToken($user);

            $url = env('APP_URL') . '/auth/password/reset?token=' . $token . '&'. $field .'=' . $user[$field];

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
                'phoneORemail' => 'required' ,
                'token' => 'required' ,         // token created for reset password not JWT
                'password' => 'required|max:255|confirmed|min:8' ,
                'password_confirmation' => 'required|max:255' ,
            ]);

            // check if provided filed is email or phone
            $field = filter_var(request('phoneORemail'), FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';

            // getting user
            $user = Password::getUser([
                $field => request('phoneORemail'), 
                'password' => request('password'), 
                'password_confirmation' => request('password_confirmation'), 
                'token' => request('token')
            ]);

            // checking if token provided as generated
            $tokenIsValid = Password::tokenExists($user, request('token'));

            if(!$tokenIsValid) throw new CustomException('error in validation' , 7);

            // save new password
            $user->password = request()->input('password');

            $user->save();

            // delete generated token for reset password
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
            $user = request('user');

            if($user->email_verified_at) throw new CustomException('email is already verified' , 8);

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
    }
}

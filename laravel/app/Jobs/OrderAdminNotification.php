<?php

namespace App\Jobs;

use App\Http\Controllers\Setting\SettingController;
use App\Mail\OrderAdminNotification as MailOrderAdminNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class OrderAdminNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public $order)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        // getting emails and check if it exists and looping it with "," separator
        $emails = (new SettingController)->valueSetting('ORDER_EMAIL_NOTIFICATION');
        if($emails)
            foreach(explode(',' , $emails) as $email)
                Mail::to($email)->send(new MailOrderAdminNotification($this->order));
    }
}

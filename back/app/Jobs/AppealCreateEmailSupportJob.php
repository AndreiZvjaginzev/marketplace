<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppealCreatedSupport;

class AppealCreateEmailSupportJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $appeal;
    protected $users;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($appeal, $users)
    {
        $this->appeal = $appeal;
        $this->users = $users;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach($this->users as $user){
            Mail::to($user)->send(new AppealCreatedSupport($this->appeal));
        }
        
    }
}

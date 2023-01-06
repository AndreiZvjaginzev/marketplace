<?php

namespace App\Observers;


use App\Models\Appeal;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppealCreated;
use App\Jobs\AppealCreateEmailJob;
use App\Jobs\AppealCreateEmailSupportJob;
use App\Models\User;
use App\Models\Role;

class AppealObserver
{
    /**
     * Handle the Appeal "created" event.
     *
     * @param  \App\Models\Appeal  $appeal
     * @return void
     */
    public function created(Appeal $appeal)
    {
        $users = Role::where("name", "Tech-support")->first()->users()->orderBy('name')->get();
        AppealCreateEmailJob::dispatch($appeal)->afterCommit();
        AppealCreateEmailSupportJob::dispatch($appeal, $users)->afterCommit();
    }

    /**
     * Handle the Appeal "updated" event.
     *
     * @param  \App\Models\Appeal  $appeal
     * @return void
     */
    public function updated(Appeal $appeal)
    {
        $users = Role::where("name", "Tech-support")->first()->users()->orderBy('name')->get();
        AppealCreateEmailJob::dispatch($appeal)->afterCommit();
        AppealCreateEmailSupportJob::dispatch($appeal, $users)->afterCommit();
    }

    /**
     * Handle the Appeal "deleted" event.
     *
     * @param  \App\Models\Appeal  $appeal
     * @return void
     */
    public function deleted(Appeal $appeal)
    {
        //
    }

    /**
     * Handle the Appeal "restored" event.
     *
     * @param  \App\Models\Appeal  $appeal
     * @return void
     */
    public function restored(Appeal $appeal)
    {
        //
    }

    /**
     * Handle the Appeal "force deleted" event.
     *
     * @param  \App\Models\Appeal  $appeal
     * @return void
     */
    public function forceDeleted(Appeal $appeal)
    {
        //
    }
}

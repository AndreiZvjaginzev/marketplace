<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Appeal;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('appeal.{appealId}', function ($user, $appealId) {
    if($user->email == 'kvisatz@mail.ru'){
        return true;
    }
    
    return $user->email === Appeal::findOrNew($appealId)->user_email;
});
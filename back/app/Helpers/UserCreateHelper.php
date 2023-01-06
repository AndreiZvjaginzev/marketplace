<?php 
    namespace App\Helpers;

    use App\Models\User;

    class AppealCreateHelper{

        static function newUser($request){
            
            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt(str_random(10));
            
            $user->save();

            return $user;   
        }
            
    }
?>
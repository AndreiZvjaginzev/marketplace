<?php 
    namespace App\Helpers;

    use App\Models\Message;
    use App\Models\Appeal;
  
    class AppealCreateHelper{


        static function newAppeal($request){
            if(isset($request->file)){
                $request->file->store('/public/images');

                $fileName = $request->file->hashName(); 
            }
            $appeal = new Appeal;
            $appeal->user_name = $request->name;
            $appeal->user_email = $request->email;
            if(isset($request->theme)){
            $appeal->theme = $request->theme; 
            }
            $appeal->status_id = 1;
            $appeal->save();

            $message = new Message;
            $message->appeal_id =  $appeal->id;
            $message->autor =  $appeal->user_name;
            $message->autor_email = $appeal->user_email;
            $message->text = $request->text;
            if(isset($request->file)){
                $message->image = $fileName; 
            }
            $message->save();
            $appeal['messages'] = $appeal->messages()->get();
            return $appeal;   
        }
            
    }
?>
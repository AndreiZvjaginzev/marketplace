<?php 
    namespace App\Helpers;

    use App\Models\Message;
    use App\Models\Appeal;
    use App\Events\MessageSendEvevnt;
  
    class MessageAddHelper{


        static function newMessage($request){
            if(isset($request->file)){
                $request->file->store('/public/images');

                $fileName = $request->file->hashName(); 
            }
            
            $message = new Message;

            $message->appeal_id = $request->appeal_id;
            $message->autor_email = $request->author;
            $message->text = $request->text;
            
            if(isset($request->file)){
                $message->image = $fileName; 
            }
            $message->save();
            MessageSendEvevnt::dispatch($message);
            return $message;   
        }
            
    }
?>
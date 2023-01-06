<?php
    namespace App\Helpers;



    class CodeRequestsHelper{

        static function writeRequest($code, $msg, $data = []){
            return ["code" => $code, "msg" => $msg, "data" => $data];
        }
    }
?>
<?php
    namespace App\Validators;

    use Illuminate\Support\Facades\Validator;

    class MessageValidator{

        static function msgValidator($request){
            return Validator::make($request->all(), [
                                                        'email' => 'required|email',
                                                        'name' => 'required|min:3|max:255',
                                                        'theme' => 'min:3|max:100',
                                                        'text' => 'required|min:3|max:1200',
                                                    ],
                                                    [
                                                        'email.required' => 'Введите свой email',
                                                        'email.email' => 'Введите корректный формат email',
                                                        'name.required' => 'Введите имя',
                                                        'name.min' => 'Минимальная длина имени 3 символа',
                                                        'name.max' => 'Маскимальная длина имени 255 символов',
                                                        'theme.min' => 'Минимальная длина темы 3 символа',
                                                        'theme.max' => 'Маскимальная длина имени 100 символов',
                                                        'text.required' => 'Введите сообщение',
                                                        'text.min' => 'Минимальная длина сообщения 3 символа',
                                                        'text.max' => 'Маскимальная длина сообщения 1200 символов',
                                                    ]);
        }
    }
    
?>
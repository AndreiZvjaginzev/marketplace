<?php

use App\Helpers\CodeRequestsHelper;
use App\Http\Middleware\GetUserToken;
use App\Models\User;
use App\Models\Shops;
use App\Models\Message;
use App\Models\Appeal;
use App\Models\Role;
use App\Models\Widget;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Http\Requests\CreateAppealRequest;
use App\Http\Requests\AppealUpdateRequest;
use App\Http\Requests\AnswerMessageRequest;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Validators\MessageValidator;
use App\Helpers\AppealCreateHelper;
use App\Helpers\UserCreateHelper;
use App\Helpers\MessageAddHelper;
use App\Events\MessageSendEvevnt;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('v1')->group(function () {
    Route::get('/users', function () {
        return 1;
    });

    Route::post('/login', function (Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {

            return response()->json(CodeRequestsHelper::writeRequest('404', 'Не верный email или password'));
        }

        $data = ['token' => $user->createToken("token_app")->plainTextToken];

        return response()->json(CodeRequestsHelper::writeRequest('200', '', $data));

    });

    Route::middleware('auth:sanctum')->group(function () {
        
        Route::get('/dashboard', function () {
            return "dashboard";
        });

        Route::get('/logout', function () {
            return "выход";
        });

        
    });

    Route::middleware([GetUserToken::class])->group(function () {
        Route::post('/user', function (Request $request) {

            $token = PersonalAccessToken::findToken($request->token);

            //return $token;

            $user = $token->tokenable;
            $user['roles'] = $user->roles()->get();

            return $user;
        });
    });
    

    
    Route::get('/shops', function (Request $request) {
        $shopsInfo = Shops::get();
       
        $data = $shopsInfo;

        return response()->json(CodeRequestsHelper::writeRequest('200', '', $data));
    });
    
    Route::get('/appeals', function (Request $request) {
        $appeals = Appeal::get();
        foreach($appeals as $appeal){
            $appeal['messages'] = $appeal->messages()->get();
            $appeal->created_at = date('d.m.Y');
        }
        
        if(isset($appeals)){
            $code = '200';
            $message = '';
            $data = $appeals;
        }
        else{
            $code = '500';
            $message = 'Ошибка сервера';
            $data = null;
        }
        return response()->json(CodeRequestsHelper::writeRequest($code, $message, $data));
    });
    Route::get('/statuses', function (Request $request) {
        $statuses = Status::get();
       
        
        if(isset($statuses)){
            $code = '200';
            $message = '';
            $data = $statuses;
        }
        else{
            $code = '500';
            $message = 'Ошибка сервера';
            $data = null;
        }
        return response()->json(CodeRequestsHelper::writeRequest($code, $message, $data));
    });

    Route::post('/update-appeal', function (AppealUpdateRequest $request) {
        $validated = $request->validated();
        $appeal = Appeal::find($request->appeal_id);
        $appeal->status_id = $request->status;
        $appeal->save();
        if($appeal){
            $code = '200';
            $message = 'Статус обновлен';
            $data = $appeal;
        }
        else{
            $code = '500';
            $message = 'Ошибка сервера';
            $data = null;
        }
        
        return response()->json(CodeRequestsHelper::writeRequest($code,$message, $data));
    });
    /*
    Route::get('/shop-create', function (Request $request) {
        $bytes = random_bytes(6);
        return bin2hex($bytes);
    });
    */

    Route::get('/orders', function (Request $request) {
        
        $data = [
            ['name' => date('d.m.Y',strtotime("-2 days")), 'uv' => 3],
            ['name' => date('d.m.Y',strtotime("-1 days")), 'uv' => 12],
            ['name'=> date('d.m.Y'), 'uv' => 41],
            ['name'=> date('d.m.Y', strtotime('-3 days')), 'uv' => 52],
            ['name'=> date('d.m.Y', strtotime('-4 days')), 'uv' => 64]
        ];

        return response()->json(CodeRequestsHelper::writeRequest('200', '', $data));
    });


    Route::post('/send-message', function (CreateAppealRequest $request) {
        
        $validated = $request->validated();
        
        $appeal = AppealCreateHelper::newAppeal($request);
        if($appeal){
            $code = '200';
            $message = 'Сообщение отправлено';
            $data = $appeal;
        }
        else{
            $code = '500';
            $message = 'Ошибка сервера';
            $data = null;
        }
        
        return response()->json(CodeRequestsHelper::writeRequest($code,$message , $data));
    });

    Route::post('/answer-message', function (AnswerMessageRequest $request) {
        
        $validated = $request->validated();
        
        $messageObj = MessageAddHelper::newMessage($request);
        if($messageObj){
            $code = '200';
            $message = 'Сообщение отправлено';
            $data = $messageObj;
            event(new MessageSendEvevnt($messageObj));
            broadcast(new MessageSendEvevnt($messageObj));
        }
        else{
            $code = '500';
            $message = 'Ошибка сервера';
            $data = null;
        }
        
        return response()->json(CodeRequestsHelper::writeRequest($code, $message, $data));
    });

    Route::post('/register-appeal-user', function (CreateAppealRequest $request) {
        
        $validated = $request->validated();
        
        $user = UserCreateHelper::newAppeal($request);
        if($user){
            $code = '200';
            $message = 'Сообщение отправлено';
            $data = $user;
        }
        else{
            $code = '500';
            $message = 'Ошибка сервера';
            $data = null;
        }
        
        return response()->json(CodeRequestsHelper::writeRequest($code,$message , $data));
    });


    Route::get('/get-auth-user', function() {
        $authUser = User::find(1);
        // $authUser = auth()->user();
        return $authUser;
    });



    Route::post('/upload-avatar', function(Request $request) {
        $authUser = User::find(1);
        $storagePath = asset('storage/');
        $status = [
            'ok' => 200,
            'bad_request' => 400
        ];
        $image = $request->image;
        $image_path = Storage::disk('public')->put('/images', $image);
        $authUser->image_path = "$storagePath/$image_path";
        if($authUser->save()) {
            return json_encode($status['ok']);
        } else {
            return json_encode($status['bad_request']);
        }
    });

    Route::get('/widgets', function() {
        $widgets = Widget::all();
        $widgetsArray = [];
        foreach($widgets as $widget) {
            foreach($widget->settings as $key => $setting) {
                $setting->values = explode(', ', $setting->values);
            }
            $widgetsArray[] = $widget;
        }
        return $widgetsArray;
    });

    Route::post('/post-places-shop', function(Request $request) {
        $authUser = User::find(1);
        $authUser->widgets_places = $request->widgets_places;
        if($authUser->save()) {
            return ['status' => 'Saved'];
        } else {
            return ['status' => 'Error 3.14...'];
        }
    });
});

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

use App\Http\Controllers\Controller;

use App\Models\Message as Message;

class _MessageController extends BaseController
{
    public function loadMessages(Request $request){
        $userController=new _UserController;

        $requestArray=$request->all();
        $fromUserID=$requestArray['fromUserID'];
        $toUserID=$requestArray['toUserID'];

       $messagesArray= json_decode(DB::table('messages')->where('_fromUserID',$fromUserID)->where('_toUserID',$toUserID)
        ->orWhere('_fromUserID',$toUserID)->where('_toUserID',$fromUserID)->get(),true);

        //var_dump($messageArray);

        $outputMessagesArray = array();

        foreach ($messagesArray as $messageArray) {
        $outputMessageArray=array();

        $outputMessageArray = [
            'messageID' => $messageArray['messageID'],
            'fromUserID' => $messageArray['_fromUserID'],
            'fromUsername' => $userController->selectUsernamePerID($messageArray['_fromUserID']),
            'toUserID' => $messageArray['_toUserID'],
            'createdAt' => $messageArray['created'],
            'msg' => $messageArray['message']
        ];

        array_push($outputMessagesArray,$outputMessageArray);

        }
        return '{"messages": '.json_encode($outputMessagesArray, JSON_PRETTY_PRINT).'}';
       // var_dump($outputMessagesArray);
    }
}

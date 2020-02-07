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


        $validateUser = $userController->validateUser($request,$fromUserID);
        if($validateUser !== true){
            return $validateUser;
        }

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

    public function loadMessage($id){
        $userController=new _UserController;

        $messageArray = json_decode(json_encode(DB::table('messages')->where('messageID',$id)->first()),true);
        //$messageArray = $messagesArray[0];

        $outputArray = [
            'messageID' => $id,
            'toUserID' => $messageArray['_toUserID'],
            'fromUserID' => $messageArray['_fromUserID'],
            'fromUsername' => $userController->selectUsernamePerID($messageArray['_fromUserID']),
            'createdAt' => $messageArray['created'],
            'msg' => $messageArray['message']
        ];

        return json_encode($outputArray);
    }

    public function saveMessage(Request $request){
        $userController=new _UserController;
        $requestArray=$request->all();

        $validateUser = $userController->validateUser($request,$requestArray['fromUserID']);
        if($validateUser !== true){
            return $validateUser;
        }

        $insertMessageArray=[
            '_fromUserID'=>$requestArray['fromUserID'],
            '_toUserID'=>$requestArray['toUserID'],
            'message'=>$requestArray['msg']
        ];


        $messageID= DB::table('messages')->insertGetId($insertMessageArray);

        return $this->loadMessage($messageID);
    }


    public function loadUserChats(Request $request) {

        $userController = new _UserController;
        $requestArray = $request->all();
        $userID = $requestArray['userID'];

        $validateUser = $userController->validateUser($request,$userID);
        if($validateUser !== true){
            return $validateUser;
        }




        $fromUserIdArray= json_decode(json_encode(DB::table('messages')->where('_toUserID',$userID)->select('_fromUserID as userID')->distinct()->get()),true);

        $toUserIdArray= json_decode(json_encode(DB::table('messages')->where('_fromUserID',$userID)->select('_toUserID as userID')->distinct()->get()),true);


        $userIdsArray=array();

        foreach($fromUserIdArray as $fromUserID){
            array_push($userIdsArray,$fromUserID);
        }

        foreach($toUserIdArray as $toUserID){
            array_push($userIdsArray,$toUserID);
        }

        $userIDs = array();

        foreach($userIdsArray as $userID){
            if(!in_array($userID,$userIDs)){
                array_push($userIDs,$userID);
            }
        }


        $outputArray = array();

        // $otherUserID = 1;

        // $message = json_decode(json_encode(DB::table('messages')->where('_toUserID',$otherUserID)->where('_fromUserID',$userID)->orWhere('_fromUserID',$otherUserID)->where('_toUserID',$userID)->orderbyDesc('created')->first()),true);

        // return $message;
        $createdArray=array();

        foreach($userIDs as $otherUserID){
            $username = $userController->selectUsernamePerID($otherUserID);

            $userArray = json_decode($userController->selectOne($username),true);

            $userID = $requestArray['userID'];
            $message = json_decode(json_encode(DB::table('messages')->where('_toUserID',$otherUserID)->where('_fromUserID',$userID)->orWhere('_fromUserID',$otherUserID)->where('_toUserID',$userID)->orderbyDesc('created')->first()),true);

            $messageArray = [
                'messageID' => $message['messageID'],
                'fromUserID' => $message['_fromUserID'],
                'fromUsername' => $userController->selectUsernamePerID($message['_fromUserID']),
                'toUserID' => $message['_toUserID'],
                'createdAt' => $message['created'],
                'msg'=>$message['message']
            ];

            array_push($createdArray,$messageArray['createdAt']);


            $userMessageArray = [
                'user' => $userArray,
                'message' => $messageArray
            ];


            array_push($outputArray,$userMessageArray);

        }

        array_multisort($createdArray,SORT_DESC, $outputArray);


        //return $outputArray[0]['message']['createdAt'];

        return '{"userMessages":'.json_encode($outputArray)."}";

    }
}

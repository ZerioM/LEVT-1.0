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
        $requestArray=$request->all();
        $fromUserID=$requestArray['fromUserID'];
        $toUserID=$requestArray['toUserID'];

       $messageArray= DB::table('messages')->where('_fromUserID',$fromUserID)->where('_toUserID',$toUserID)
        ->orWhere('_fromUserID',$toUserID)->where('_toUserID',$fromUserID)->get();

        var_dump($messageArray);


    }
}

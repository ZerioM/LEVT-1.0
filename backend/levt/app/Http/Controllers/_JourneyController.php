<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Journey as Journey;
use App\Models\User as User;

class _JourneyController extends BaseController
{
    //
    public function insertOne(Request $request){

        $userID = DB::table('users')->where('username',$request->input('username'))->value('userID');
        //$thumbnailID = DB::table('images')->where('src',$request->input('thumbnailSRC'))->value('thumbnailID');

        $insertArray = [
            '_userID' => $userID,
            '_thumbnailID' => $request->input('thumbnailID'),
            'journeyName' => $request->input('journeyName'),
            '_seasonID' => $request->input('seasonID'),
            '_journeyCategoryID' => $request->input('journeyCategoryID'),
            '_companionshipID' => $request->input('companionshipID'),
            'year' => $request->input('year'),
            'detail' => $request->input('detail'),
            'duration' => $request->input('duration'),
            'cost' => $request->input('cost')
        ];
        $id = DB::table('journeys')->insertGetId($insertArray);
        $idArray = [
            'journeyID' => $id,
            'username' => $request->input('username')
        ];
        $returnArray = array_merge($idArray,array_shift($insertArray));
        return json_encode($returnArray,JSON_PRETTY_PRINT);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Post as Post;

class _PostController extends BaseController
{
    public function insertOne(Request $request){

        $requestArray = $request->all();

        $activityController = new _ActivityController;


        $insertPostArray = [
            '_activityID' => $requestArray['activityID'],
            '_placeID' => $requestArray['placeID'],
            'text' => $requestArray['text']
        ];

        $id = DB::table('posts')->insertGetId($insertPostArray);

        $outputArray = [
            'postID' => $id,
            'activity' => $activityController->selectNameByID($requestArray['activityID']),
            'text' => $requestArray['text'],
            'place' => null,
            'images' => null
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function selectByPlaceIDWithoutChildren($placeID){
        return DB::table('posts')->where('_placeID', $placeID);
    }
}

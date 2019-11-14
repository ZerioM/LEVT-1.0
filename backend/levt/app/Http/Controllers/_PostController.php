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

        $activityController = new _ActivityController;


        $insertPostArray = [
            '_activityID' => $request->input('activityID'),
            '_placeID' => $request->input('placeID'),
            'text' => $request->input('text')
        ];

        $id = DB::table('posts')->insertGetId($insertPostArray);

        $outputArray = [
            'postID' => $id,
            'activity' => $activityController->selectNameByID($request->input('activityID')),
            'text' => $request->input('text'),
            'place' => null,
            'images' => null
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function selectByPlaceIDWithoutChildren($placeID){
        return DB::table('posts')->where('_placeID', $placeID);
    }
}

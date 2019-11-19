<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Image as Image;

class _ImageController extends BaseController
{
    public function selectIDPerSrc($src){
        return DB::table('images')->where('src',$src)->value('imageID');
    }

    public function selectSrcPerUserID($userID){
        return DB::table('images')
        ->join('users','images.imageID','=','users._profileImageID')
        ->where('userid',$userID)->value('src');
    }

    public function selectSrcPerImageID($id){
        return DB::table('images')->where('imageID',$id)->value('src');
    }

    public function insertOne(Request $request){

        $requestArray = $request->all();

        $insertImagesArray = [
            'src' => $requestArray['imgSrc'],
            'coordinateX' => $requestArray['coordinateX'],
            'coordinateY' => $requestArray['coordinateY'],
            'date' => $requestArray['date'],
            '_postID' => $requestArray['postID'],
        ];

        $id = DB::table('images')->insertGetId($insertImagesArray);

        $outputArray = [
            'imageID' => $id,
            'imageSrc' => $requestArray['src'],
            'date' => $requestArray['date'],
            'coordinateX' => $requestArray['coordinateX'],
            'coordinateY' => $requestArray['coordinateY']
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);

    }

}

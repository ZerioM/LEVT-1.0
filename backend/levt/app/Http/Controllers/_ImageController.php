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

    public function selectByPostID($postID){
        return DB::table('images')->where('_postID', $postID);
    }

    public function insertOne(Request $request){

        $requestArray = $request->all();

        $insertImagesArray = [
            'src' => $requestArray['imgSrc'],
            'coordinateX' => $requestArray['coordinateX'],
            'coordinateY' => $requestArray['coordinateY'],
            'date' => $requestArray['date'],
            '_postID' => $requestArray['_postID']
        ];

        $id = DB::table('images')->insertGetId($insertImagesArray);



        return $this->selectOne($id);

    }

    public function selectOne($id){

        $imagesArray = json_decode(json_encode(DB::table('images')->where('imageID',$id)->get()),true);
        $imageArray = $imagesArray[0];

        $outputArray = [
            'imageID' => $id,
            '_postID' => $imageArray['_postID'],
            'imgSrc' => $imageArray['src'],
            'date' => $imageArray['date'],
            'coordinateX' => $imageArray['coordinateX'],
            'coordinateY' => $imageArray['coordinateY']
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function updateOne(Request $request){

        $requestArray = $request->all();

        $image = Image::find($requestArray['imageID']);

        $image->src = $requestArray['imgSrc'];
        $image->coordinateX = $requestArray['coordinateX'];
        $image->coordinateY = $requestArray['coordinateY'];
        $image->date = $requestArray['date'];

        $image->save();

        return $this->selectOne($requestArray['imageID']);
    }

    public function deleteOne(Request $request){

        $requestArray = $request->all();

        $image = Image::find($requestArray['imageID']);

        $image->delete();

        $outputArray = [
            "deleted" => true
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

}

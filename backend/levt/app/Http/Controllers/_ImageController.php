<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;


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
        $userController = new _UserController;
        $requestArray = $request->all();

        $userID = $userController->selectIDPerPostID($requestArray['_postID']);
        //muss am Handy getestet werden
        // $validateUser = $userController->validateUser($request,$userID);
        // if($validateUser !== true){
        //     return $validateUser;
        // }

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

        //$userController = new _UserController;

        //$userID = $userController->selectIDPerPostID($requestArray['_postID']);

        // $validateUser = $userController->validateUser($request,$userID);
        // if($validateUser !== true){
        //     return $validateUser;
        // }

        $image = Image::find($requestArray['imageID']);
        
        if($image != null){
            $imageArray = json_decode($image,true);
            $src = $imageArray['src'];
            //$src = substr($src,-66);
            $src = substr($src,59);
            Storage::delete($src);

            $image->delete();

            $outputArray = [
                "deleted" => true
            ];
            return json_encode($outputArray,JSON_PRETTY_PRINT);
        }

        
    }


    public function uploadOne(Request $request){

        $userController = new _UserController;
        $requestArray = $request->all();
     

        $mytime = Carbon::now();
        $mytime->toDateTimeString();
        $year = substr($mytime, 0, -15);
        $month = substr($mytime, 5, -12);
        $day = substr($mytime, 8, -9);
        $hour = substr($mytime, 11, -6);
        Storage::makeDirectory('images/'.$year.'/'.$month.'/'.$day.'/'.$hour);
        $path = $request->file('picUpload')->store('images/'.$year.'/'.$month.'/'.$day.'/'.$hour);
        
        $array = (json_decode($requestArray['data'],true));

        $userID = $userController->selectIDPerPostID($array['_postID']);
        //muss am Handy getestet werden
        // $validateUser = $userController->validateUser($request,$userID);
        // if($validateUser !== true){
        //     return $validateUser;
        // }


        $insertImagesArray = [
            'src' => "https://flock-1427.students.fhstp.ac.at/backend/storage/app/".$path,
            'coordinateX' => $array['coordinateX'],
            'coordinateY' => $array['coordinateY'],
            'date' => $array['date'],
            '_postID' => $array['_postID']
        ];

        $id = DB::table('images')->insertGetId($insertImagesArray);
        //return var_export($request);

        return $this->selectOne($id);
    }

}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
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
        
        if($image != null){
            $imageArray = json_decode($image,true);
            $src = $imageArray['src'];
            //$src = substr($src,-66);
            $src = substr($src,107);
            print_r($src);
            Storage::delete($src);

            $image->delete();

            $outputArray = [
                "deleted" => true
            ];
            return json_encode($outputArray,JSON_PRETTY_PRINT);
        }

        
    }


    public function uploadOne(Request $request){

        $this->validate($request,[

            'picUpload' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',

        ]);

        $mytime = Carbon::now();
        $mytime->toDateTimeString();
        $year = substr($mytime, 0, -15);
        $month = substr($mytime, 5, -12);
        $day = substr($mytime, 8, -9);
        $hour = substr($mytime, 11, -6);
        Storage::makeDirectory('images/'.$year.'/'.$month.'/'.$day.'/'.$hour);
        
        $requestArray = $request->all();
        $array = (json_decode($requestArray['data'],true));
        //print_r($array['imageID']);
        //print_r($request->file('picUpload'));

        $insertImagesArray = [
            'src' => "sftp://flock-1427@flock-1427.students.fhstp.ac.at/flock-1427.students.fhstp.ac.at/backend/levt/storage/app/"
            .$request->file('picUpload')->store('images/'.$year.'/'.$month.'/'.$day.'/'.$hour),
            'coordinateX' => $array['coordinateX'],
            'coordinateY' => $array['coordinateY'],
            'date' => $array['date'],
            '_postID' => $array['_postID']
        ];

        $id = DB::table('images')->insertGetId($insertImagesArray);

        return $this->selectOne($id);
    }

}
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

        $requestArray = $request->all();

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

    public function selectOne(Request $request){
        $imageController = new _ImageController;
        $activityController = new _ActivityController;
        $placeController = new _PlaceController;

        $requestArray = $request->all();

        $id = $requestArray['postID'];

        $postsArray = json_decode(json_encode(DB::table('posts')->where('postID',$id)->get()),true);
        $postArray = $postsArray[0];

        $imagesArray = json_decode(json_encode($imageController->selectByPostID($id)->get()),true);

        $placesArray = json_decode(json_encode($placeController->selectByIDWithoutChildren($postArray['_placeID'])->get()),true);
        $placeArray = $placesArray[0];

        $outputImagesArray = array();
        foreach ($imagesArray as $imageArray) {
            $outputImageArray = array();
            $outputImageArray = [
                'imageID' => $imageArray['imageID'],
                'imgSrc' => $imageArray['src'],
                'date' => $imageArray['date'],
                'coordinateX' => $imageArray['coordinateX'],
                'coordinateY' => $imageArray['coordinateY']
            ];
            array_push($outputImagesArray,$outputImageArray);
        }

        $outputArray = [
            'postID' => $postArray['postID'],
            'activity' => $activityController->selectNameByID($postArray['_activityID']),
            'text' => $postArray['text'],
            'place' => $placeArray,
            'images' => $outputImagesArray
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function updateOne(Request $request){

        $requestArray = $request->all();
       
        $post = Post::find($requestArray['postID']);

        $post->_activityID = $requestArray['_activityID'];
        $post->text = $requestArray['text'];

        $post->save();
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Post as Post;

class _PostController extends BaseController
{
    public function insertOne(Request $request){

        $requestArray = $request->all();

        $insertPostArray = [
            '_activityID' => $requestArray['_activityID'],
            '_placeID' => $requestArray['_placeID'],
            'detail' => $requestArray['detail']
        ];

        $id = DB::table('posts')->insertGetId($insertPostArray);

        return $this->selectOne($id);
    }

    public function selectByPlaceIDWithoutChildren($placeID){
        return DB::table('posts')->where('_placeID', $placeID);
    }

    public function selectOne($id){
        $imageController = new _ImageController;
        $activityController = new _ActivityController;
        $placeController = new _PlaceController;
        $countryController = new _CountryController;

        $postsArray = json_decode(json_encode(DB::table('posts')->where('postID',$id)->get()),true);
        $postArray = $postsArray[0];

        $imagesArray = json_decode(json_encode($imageController->selectByPostID($id)->get()),true);

        $placesArray = json_decode(json_encode($placeController->selectByIDWithoutChildren($postArray['_placeID'])->get()),true);
        $placeArray = $placesArray[0];
        $outputPlaceArray = array();
        $outputPlaceArray = [
            'placeID' => $placeArray['placeID'],
            '_journeyID' => $placeArray['_journeyID'],
            '_thumbnailID' => $placeArray['_thumbnailID'],
            '_countryID' => $placeArray['_countryID'],
            'placeName' => $placeArray['placeName'],
            'coordinateX' => $placeArray['coordinateX'],
            'coordinateY' => $placeArray['coordinateY'],
            'detail' => $placeArray['detail'],

            'posts' => null,
            'thumbnailSrc' => null,
            'countryName' => $countryController->selectNamePerID($placeArray['_countryID'])
        ];

        $outputImagesArray = array();
        foreach ($imagesArray as $imageArray) {
            $outputImageArray = array();
            $outputImageArray = [
                'imageID' => $imageArray['imageID'],
                '_postID' => $imageArray['_postID'],
                'imgSrc' => $imageArray['src'],
                'date' => $imageArray['date'],
                'coordinateX' => $imageArray['coordinateX'],
                'coordinateY' => $imageArray['coordinateY']
            ];
            array_push($outputImagesArray,$outputImageArray);
        }

        $outputArray = [
            'postID' => $postArray['postID'],
            '_activityID' => $postArray['_activityID'],
            '_placeID' => $postArray['_placeID'],
            'detail' => $postArray['detail'],

            'activityName' => $activityController->selectNameByID($postArray['_activityID']),
            'iconName' => $activityController->selectIconByID($postArray['_activityID']),
            'placeName' => $outputPlaceArray['placeName'],
            '_countryID' => $outputPlaceArray['_countryID'],
            'images' => $outputImagesArray
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function updateOne(Request $request){

        $requestArray = $request->all();

        $post = Post::find($requestArray['postID']);

        $post->_activityID = $requestArray['_activityID'];
        $post->detail = $requestArray['detail'];

        $post->save();

        return $this->selectOne($requestArray['postID']);
    }

    public function deleteOne(Request $request){

        $requestArray = $request->all();

        $post = Post::find($requestArray['postID']);

        $post->delete();

        $outputArray = [
            "deleted" => true
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }
}

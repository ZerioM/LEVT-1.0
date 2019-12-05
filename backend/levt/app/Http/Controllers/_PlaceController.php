<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Place as Place;

class _PlaceController extends BaseController
{

    public function insertOne(Request $request){
        $countryController = new _CountryController;
        $imageController = new _ImageController;

        $requestArray = $request->all();


        //Create DB table object
        $insertPlacesArray = [
            '_journeyID' => $requestArray['_journeyID'],
            '_thumbnailID' => $requestArray['_thumbnailID'],
            '_countryID' => $requestArray['_countryID'],
            'placeName' => $requestArray['placeName'],
            'coordinateX' => $requestArray['coordinateX'],
            'coordinateY' => $requestArray['coordinateY'],
            'detail' => $requestArray['detail']
        ];

        $id = DB::table('places')->insertGetId($insertPlacesArray);

        return $this->selectOne($id);
    }

    public function selectByJourneyIDWithoutChildren($journeyID){
        return DB::table('places')->where('_journeyID', $journeyID);
    }

    public function selectByIDWithoutChildren($id){
        return DB::table('places')->where('placeID', $id);
    }

    public function selectOne($id){
        $postController = new _PostController;
        $activityController = new _ActivityController;
        $imageController = new _ImageController;
        $countryController = new _CountryController;

        $placesArray = json_decode(json_encode(DB::table('places')->where('placeID',$id)->get()),true);
        $placeArray = $placesArray[0];

        $postsArray = json_decode(json_encode($postController->selectByPlaceIDWithoutChildren($id)->get()),true);

        $outputPostsArray = array();
        foreach ($postsArray as $postArray) {
            $outputPostArray = array();
            $outputPostArray = [
                'postID' => $postArray['postID'],
                '_activityID' => $postArray['_activityID'],
                '_placeID' => $postArray['_placeID'],
                'detail' => null,

                'activityName' => $activityController->selectNameByID($postArray['_activityID']),
                'iconName' => $activityController->selectIconByID($postArray['_activityID']),
                'place' => null,
                'images' => $this->selectImagesByPostID($postArray['postID'])
            ];
            array_push($outputPostsArray,$outputPostArray);
        }

        $outputArray = [
            'placeID' => $placeArray['placeID'],
            '_journeyID' => $placeArray['_journeyID'],
            '_thumbnailID' => $placeArray['_thumbnailID'],
            '_countryID' => $placeArray['_countryID'],
            'placeName' => $placeArray['placeName'],
            'coordinateX' => $placeArray['coordinateX'],
            'coordinateY' => $placeArray['coordinateY'],
            'detail' => $placeArray['detail'],

            'posts' => $outputPostsArray,
            'thumbnailSrc' => $imageController->selectSrcPerImageID($placeArray['_thumbnailID']),
            'countryName' => $countryController->selectNamePerID($placeArray['_countryID'])
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function updateOne(Request $request){

        $requestArray = $request->all();

        $place = Place::find($requestArray['placeID']);

        $place->_thumbnailID = $requestArray['_thumbnailID'];
        $place->_countryID = $requestArray['_countryID'];
        $place->placeName = $requestArray['placeName'];
        $place->coordinateX = $requestArray['coordinateX'];
        $place->coordinateY = $requestArray['coordinateY'];
        $place->detail = $requestArray['detail'];

        $place->save();

        return $this->selectOne($requestArray['placeID']);
    }

    public function deleteOne(Request $request){

        $requestArray = $request->all();

        $place = Place::find($requestArray['placeID']);

        $place->delete();

        $outputArray = [
            "deleted" => true
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function selectImagesByPostID($postID){
        $imageController = new _ImageController;

        $imagesArray = json_decode(json_encode($imageController->selectByPostID($postID)->get()),true);

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

        return $outputImagesArray;
    }

    public function validatePlaceName($placeName){

        //Implement Google Api and check if Place available


        return true;
    }

}

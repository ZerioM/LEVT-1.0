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

        $requestArray = $request->all();

        $countryController = new _CountryController;
        $imageController = new _ImageController;

        $thumbnailID = $imageController->selectIDPerSrc($requestArray['thumbnailSrc']);

        $countryID = $countryController->selectIDPerName($requestArray['countryName']);

        //Create DB table object
        $insertPlacesArray = [
            '_journeyID' => $requestArray['journeyID'],
            '_thumbnailID' => $thumbnailID,
            '_countryID' => $countryID,
            'placeName' => $requestArray['name'],
            'coordinateX' => $requestArray['coordinateX'],
            'coordinateY' => $requestArray['coordinateY']
        ];

        $id = DB::table('places')->insertGetId($insertPlacesArray);

        $outputArray = [
            'placeID' => $id,
            'name' => $requestArray['name'],
            'coordinateX' => $requestArray['coordinateX'],
            'coordinateY' => $requestArray['coordinateY'],
            'posts' => null,
            'thumbnailSrc' => $requestArray['thumbnailSrc']
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function selectByJourneyIDWithoutChildren($journeyID){
        return DB::table('places')->where('_journeyID', $journeyID);
    }

    public function selectByIDWithoutChildren($id){
        return DB::table('places')->where('placeID', $id);
    }

    public function selectOne(Request $request){
        $postController = new _PostController;
        $activityController = new _ActivityController;
        $imageController = new _ImageController;

        $requestArray = $request->all();

        $id = $requestArray['placeID'];

        $placesArray = json_decode(json_encode(DB::table('places')->where('placeID',$id)->get()),true);
        $placeArray = $placesArray[0];

        $postsArray = json_decode(json_encode($postController->selectByPlaceIDWithoutChildren($id)->get()),true);

        $outputPostsArray = array();
        foreach ($postsArray as $postArray) {
            $outputPostArray = array();
            $outputPostArray = [
                'postID' => $postArray['postID'],
                'activity' => $activityController->selectNameByID($postArray['_activityID']),
                'text' => null,
                'place' => null,
                'images' => null
            ];
            array_push($outputPostsArray,$outputPostArray);
        }

        $outputArray = [
            'placeID' => $placeArray['placeID'],
            'name' => $placeArray['placeName'],
            'text' => $placeArray['text'],
            'coordinateX' => $placeArray['coordinateX'],
            'coordinateY' => $placeArray['coordinateY'],
            'posts' => $outputPostsArray,
            'thumbnailSrc' => $imageController->selectSrcPerImageID($placeArray['_thumbnailID'])
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
        $place->text = $requestArray['text'];

        $place->save();
    }

}

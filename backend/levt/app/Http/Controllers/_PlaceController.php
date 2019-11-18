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

        $thumbnailID = $imageController->selectIDPerSrc($request->input('thumbnailSrc'));

        $countryID = $countryController->selectIDPerName($request->input('countryName'));

        //Create DB table object
        $insertPlacesArray = [
            '_journeyID' => $request->input('journeyID'),
            '_thumbnailID' => $thumbnailID,
            '_countryID' => $countryID,
            'placeName' => $request->input('name'),
            'coordinateX' => $request->input('coordinateX'),
            'coordinateY' => $request->input('coordinateY')
        ];

        $id = DB::table('places')->insertGetId($insertPlacesArray);

        $outputArray = [
            'placeID' => $id,
            'name' => $request->input('name'),
            'coordinateX' => $request->input('coordinateX'),
            'coordinateY' => $request->input('coordinateY'),
            'posts' => null,
            'thumbnailSrc' => $request->input('thumbnailSrc')
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function selectByJourneyIDWithoutChildren($journeyID){
        return DB::table('places')->where('_journeyID', $journeyID);
    }

    public function selectOne(Request $request){
        $postController = new _PostController;
        $activityController = new _ActivityController;
        $imageController = new _ImageController;

        $id = $request->input('placeID');

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

}

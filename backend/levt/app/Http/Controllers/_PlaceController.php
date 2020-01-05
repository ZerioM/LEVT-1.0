<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

use App\Http\Controllers\Controller;

use App\Models\Place as Place;

class _PlaceController extends BaseController
{

    public function selectByCountryID($countryID){
        return DB::table('places')->where('_countryID',$countryID)->get();
    }

    public function selectBetweenCoordinates($leftX,$leftY,$rightX,$rightY){
        if($leftX > $rightX){
            //OR:
            return DB::table('places')->whereBetween('coordinateX',[$leftY,$rightY])
                                        ->whereNotBetween('coordinateY',[$leftX,$rightX])
                                        ->get();
        }
        //AND:
        return DB::table('places')->whereBetween('coordinateX',[$leftX,$rightX])
                                    ->whereBetween('coordinateY',[$leftY,$rightY])
                                    ->get();
    }

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

    public function selectAll(Request $request){
        $places = json_decode(json_encode(DB::table('places')->get()),true);

        $outputArray = array();

        foreach($places as $place){
            $placeID = $place['placeID'];
            $onePlace = json_decode($this->selectOne($placeID),true);
            array_push($outputArray, $onePlace);
        }

        return '{"places": '.json_encode($outputArray,JSON_PRETTY_PRINT)."\n}";
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
                'detail' => $postArray['detail'],

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

    public function validateOne(Request $request){
        $cc = new _CountryController;
        $requestArray = $request->all();
        $placeName = $requestArray['placeName'];
        $firstPlace = DB::table('places')->where('placeName', $placeName)->first();
        $firstPlaceArray = json_decode(json_encode($firstPlace), true);
        if ($firstPlace == null){
            $client = new Client();

            $link = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="
            .$requestArray['placeName']
            ."&inputtype=textquery&fields=formatted_address,name,geometry,place_id&language=en&key="
            .env('API_KEY');


            $placeRes = $client->get($link);
            $placeResult=json_decode($placeRes->getBody(),true);
            if ($placeResult['candidates']!=null){
                $formAddress = $placeResult['candidates'][0]['formatted_address'];
                $countryName = substr(strrchr($formAddress, ", "),2);
                $countryID = $cc->selectIDPerName($countryName);


                $outputArray = [
                    '_journeyID' => $requestArray['_journeyID'],
                    '_thumbnailID' => $requestArray['_thumbnailID'],
                    '_countryID' => $countryID,
                    'placeName' => $requestArray['placeName'],
                    'coordinateX' => $placeResult['candidates'][0]['geometry']['location']['lat'],
                    'coordinateY' => $placeResult['candidates'][0]['geometry']['location']['lng'],
                    'detail' => $requestArray['detail'],
                    'posts' => $requestArray['posts'],
                    'thumbnailSrc' => $requestArray['thumbnailSrc'],
                    'countryName' => $requestArray['countryName']
                ];
            } else {
                $outputArray = [
                    '_journeyID' => $requestArray['_journeyID'],
                    '_thumbnailID' => $requestArray['_thumbnailID'],
                    '_countryID' => null,
                    'placeName' => $requestArray['placeName'],
                    'coordinateX' => null,
                    'coordinateY' => null,
                    'detail' => $requestArray['detail'],
                    'posts' => $requestArray['posts'],
                    'thumbnailSrc' => $requestArray['thumbnailSrc'],
                    'countryName' => $requestArray['countryName']
                ];
            }
        } else {
            $outputArray = [
                'placeID' => null,
                '_journeyID' => $requestArray['_journeyID'],
                '_thumbnailID' => $requestArray['_thumbnailID'],
                '_countryID' => $firstPlaceArray['_countryID'],
                'placeName' => $requestArray['placeName'],
                'coordinateX' => $firstPlaceArray['coordinateX'],
                'coordinateY' => $firstPlaceArray['coordinateY'],
                'detail' => $requestArray['detail'],
                'posts' => $requestArray['posts'],
                'thumbnailSrc' => $requestArray['thumbnailSrc'],
                'countryName' => $requestArray['countryName']
            ];
        }
        return $outputArray;
    }

    public function autocompleteOne(Request $request){

        $requestArray = $request->all();
        $placeName = $requestArray['placeName'];
        $client = new Client();
        $link = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="
            .$placeName
            ."&types=(regions)&key="
            .env('API_KEY');

        $places = $client->get($link);
        $placesResult=json_decode($places->getBody(),true);

        $outputArrays = array();
        for ($i=0; $i<sizeof($placesResult['predictions']);$i++){
            $outputArray = [
                'placeID'=>null,
                '_journeyID'=>null,
                '_thumbnailID'=>null,
                '_countryID'=>null,
                'placeName' => $placesResult['predictions'][$i]['description'],
                'coordinateX'=>null,
                'coordinateY'=>null,
                'detail'=>null,
                'posts'=>null,
                'thumbnailSrc'=>null,
                'countryName'=>null
            ];
            //$outputArray = '"'.'place'.$i.'"'.':'.'"'.$placesResult['predictions'][$i]['description'].'"';
            array_push($outputArrays,$outputArray);
        }
        //var_dump($outputArrays->toJson());
        return '{"places": '.json_encode($outputArrays, JSON_PRETTY_PRINT).'}';

    }

}

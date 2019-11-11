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

        //ACHTUNG! VORHER country-Tabelle befüllen!

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

}

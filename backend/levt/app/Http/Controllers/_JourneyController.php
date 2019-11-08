<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Journey as Journey;

class _JourneyController extends BaseController
{
    //
    public function insertOne(Request $request){
        $insertArray = [
            '_userID' => $request->input('userID'),
            '_thumbnailID' => $request->input('thumbnailID'),
            'journeyName' => $request->input('journeyName'),
            '_seasonID' => $request->input('seasonID'),
            '_journeyCategoryID' => $request->input('journeyCategoryID'),
            '_companionshipID' => $request->input('companionshipID'),
            'year' => $request->input('year'),
            'detail' => $request->input('detail'),
            'duration' => $request->input('duration'),
            'cost' => $request->input('cost')
        ];
        $id = DB::table('journeys')->insertGetId($insertArray);
        $idArray = [
            'journeyID' => $id
        ];
        $returnArray = array_merge($idArray,$insertArray);
        return json_encode($returnArray,JSON_PRETTY_PRINT);
    }
}

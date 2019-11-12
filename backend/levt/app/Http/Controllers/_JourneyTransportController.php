<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\JourneyTransport as JourneyTransport;

class _JourneyTransportController extends BaseController
{
    //
    public function insertOne($journeyID,$type){

        if($type == "plane") $transportID = 1;
        if($type == "car") $transportID = 2;
        if($type == "bus") $transportID = 3;
        if($type == "train") $transportID = 4;
        if($type == "ship") $transportID = 5;
        if($type == "motorbike") $transportID = 6;
        if($type == "campingtrailer") $transportID = 7;
        if($type == "hiking") $transportID = 8;
        if($type == "bicycle") $transportID = 9;

        $insertArray = [
            '_journeyID' => $journeyID,
            '_transportID' => $transportID
        ];

        return DB::table('journeyTransports')->insert($insertArray);
    }
}

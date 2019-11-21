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

        DB::table('journeyTransports')->insert($insertArray);

    }

    public function ifNotExistsInsertOne($journeyID,$type){
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

        if($this->checkIfExists($journeyID,$transportID) == false)
        {
            DB::table('journeyTransports')->insert($insertArray);
        }
    }

    public function ifExistsDeleteOne($journeyID,$type){
        $transportID = 4;

        if($type == 'plane') $transportID = 1;
        if($type == 'car') $transportID = 2;
        if($type == 'bus') $transportID = 3;
        if($type == 'train') $transportID = 4;
        if($type == 'ship') $transportID = 5;
        if($type == 'motorbike') $transportID = 6;
        if($type == 'campingtrailer') $transportID = 7;
        if($type == 'hiking') $transportID = 8;
        if($type == 'bicycle') $transportID = 9;

        if($this->checkIfExists($journeyID,$transportID))
        {
            $journeyTransport = JourneyTransport::where('_journeyID', '=',$journeyID)
                      ->where('_transportID', '=',$transportID)
                      ->first();

            $journeyTransport->delete();

            $outputArray = [
                "deleted" => true,
                "not found" => false
            ];
        }



        $outputArray = [
            "deleted" => false,
            "not found" => true
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function selectByJourneyIDAndType($id,$type){
        $transportID = 4;

        if($type == 'plane') $transportID = 1;
        if($type == 'car') $transportID = 2;
        if($type == 'bus') $transportID = 3;
        if($type == 'train') $transportID = 4;
        if($type == 'ship') $transportID = 5;
        if($type == 'motorbike') $transportID = 6;
        if($type == 'campingtrailer') $transportID = 7;
        if($type == 'hiking') $transportID = 8;
        if($type == 'bicycle') $transportID = 9;

        return $this->checkIfExists($id,$transportID);
    }

    private function checkIfExists($journeyID,$transportID){

        $journeyTransport = JourneyTransport::where([['_journeyID', '=',$journeyID],['_transportID', '=',$transportID]]);

        $journeyTransportExists = $journeyTransport->exists();

        return $journeyTransportExists;

    }
}

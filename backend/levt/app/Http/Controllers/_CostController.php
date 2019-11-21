<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Cost as Cost;

class _CostController extends BaseController
{
    //
    public function insertOne($journeyID,$type,$cost){


        if($type == "accommodation") $activityID = 2;
        else if($type == "mealsanddrinks") $activityID = 3;
        else if($type == "transportation") $activityID = 4;
        else if($type == "other") $activityID = 5;
        else $activityID = 1;

        $insertArray = [
            '_journeyID' => $journeyID,
            '_activityID' => $activityID,
            'cost' => $cost
        ];

        return DB::table('costs')->insert($insertArray);
    }

    public function updateOne($journeyID,$type,$cost){

        if($type == "accommodation") $activityID = 2;
        else if($type == "mealsanddrinks") $activityID = 3;
        else if($type == "transportation") $activityID = 4;
        else if($type == "other") $activityID = 5;
        else if($type == "leisure") $activityID = 1;
        else return;

        if($this->checkIfExists($journeyID,$activityID)){
            $costRecord = Cost::where('_journeyID', '=', $journeyID)
                    ->where('_activityID', '=', $activityID)
                    ->first();

            $costRecord->cost = $cost;


            $costRecord->save();
        }

    }

    public function selectAllCostsByJourneyIDAndType($id, $type){
        if($type == "accommodation") $activityID = 2;
        else if($type == "mealsanddrinks") $activityID = 3;
        else if($type == "transportation") $activityID = 4;
        else if($type == "other") $activityID = 5;
        else $activityID = 1;

        return DB::table('costs')->where([['_journeyID', '=', $id], ['_activityID', '=', $activityID]])->value('cost');
    }

    public function checkIfExists($journeyID,$activityID){
        $costRecord = Cost::where([['_journeyID', '=', $journeyID],['_activityID', '=',$activityID]]);

        return $costRecord->exists();
    }

}

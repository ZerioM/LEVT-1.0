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
    public function insertOne($journeyID,$activityID,$cost){
        $insertArray = [
            '_journeyID' => $journeyID,
            '_activityID' => $activityID,
            'cost' => $cost
        ];

        return DB::table('costs')->insert($insertArray);
    }

}

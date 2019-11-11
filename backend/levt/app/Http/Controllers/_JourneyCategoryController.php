<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\JourneyCategory as JourneyCategory;

class _JourneyCategoryController extends BaseController
{

    public function selectAll(){

        return '{"journeyCategories": '.json_encode(JourneyCategory::all(), JSON_PRETTY_PRINT)." \n}";
    }

    public function selectNamePerID($id){
        return DB::table('journeyCategories')->where('journeyCategoryID',$id)->value('journeyCategoryName');
    }
}

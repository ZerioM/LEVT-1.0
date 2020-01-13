<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Country as Country;

class _CountryController extends BaseController
{
    public function selectIDPerName($name){
        return DB::table('countries')->where('countryName',$name)->value('countryID');
    }

    public function selectNamePerID($id){
        return DB::table('countries')->where('countryID',$id)->value('countryName');
    }

    public function selectAll(){
        return Country::all();
    }

    public function selectAllAsObject(){
        return '{"countries": '.json_encode(Country::all(),JSON_PRETTY_PRINT)." \n}";
    }
}

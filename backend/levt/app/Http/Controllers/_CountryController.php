<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
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
}

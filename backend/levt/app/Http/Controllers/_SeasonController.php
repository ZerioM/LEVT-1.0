<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Season as Season;

class _SeasonController extends BaseController
{
    //
    public function selectIDPerName($name){
        return DB::table('seasons')->where('seasonName',$name)->value('seasonID');
    }

    public function selectNameByID($id){
        return DB::table('seasons')->where('seasonID',$id)->value('seasonName');
    }
}

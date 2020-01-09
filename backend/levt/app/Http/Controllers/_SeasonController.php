<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
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

    public function selectAll(){
        return '{"seasons": '.json_encode(Season::all(), JSON_PRETTY_PRINT)." \n}";
    }
}

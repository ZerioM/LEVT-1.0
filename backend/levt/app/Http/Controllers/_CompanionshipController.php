<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

use App\Models\Companionship as Companionship;

class _CompanionshipController extends BaseController
{

    public function selectAll(){
        return '{"companionships": '.json_encode(Companionship::all(), JSON_PRETTY_PRINT)." \n}";
    }

    public function selectTypePerID($id){
        return DB::table('companionships')->where('companionshipID',$id)->value('companionshipType');
    }

}

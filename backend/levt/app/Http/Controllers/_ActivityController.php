<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Activity as Activity;

class _ActivityController extends BaseController
{
    public function selectNameByID($id){
        return DB::table('activities')->where('activityID',$id)->value('activityName');
    }

    public function selectAll(){
        return '{"activities": '.json_encode(Activity::all(), JSON_PRETTY_PRINT)." \n}";
    }
}

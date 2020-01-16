<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Gender as Gender;

class _GenderController extends BaseController
{
    public function selectNameByID($id){
        return DB::table('genders')->where('genderID',$id)->value('genderName');
    }

    public function selectAll(){
        return '{"genders": '.json_encode(Gender::all(), JSON_PRETTY_PRINT)." \n}";
    }
}

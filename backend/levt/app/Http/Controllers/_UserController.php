<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\User as User;

class _UserController extends BaseController
{
    public function selectUsernamePerID($id){
        return DB::table('users')->where('userid',$id)->value('username');
    }

    public function selectIDPerUsername($username){
        return DB::table('users')->where('username',$username)->value('userID');
    }
}

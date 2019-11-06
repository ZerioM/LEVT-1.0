<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class CreateController extends BaseController
{
    public function insertJourney() {

    }

    public function insertPlace() {

    }

    public function insertPost() {

    }

    public function insertImage() {

    }

    /*
    //Post Requests und Module work:

    public function listUsers(){
        return User::all();
    }

    public function register(Request $request){
        //print_r($request->input());
        $newUser = new User;
        $newUser->username = $request->input('username');
        $newUser->pwHash = Hash::make($request->input('pwHash'));
        echo $newUser->save();
    }

    public function login(Request $request){
        $users = User::all();

        foreach($users as $u){

            //echo $u->username.$request->input('username');

            if($u->username == $request->input('username')) {
                if(Hash::check($request->input('pwHash'),$u->pwHash)){
                    return "login successful";
                }
            }
        }
        return "could not login. please try again";
    }
    */
}

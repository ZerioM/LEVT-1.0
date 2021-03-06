<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class CreateController extends BaseController
{
    public function insertJourney(Request $request) {
        $journeyController = new _JourneyController;
        return $journeyController->insertOne($request);
    }

    public function insertPlace(Request $request) {
        $placeController = new _PlaceController;
        return $placeController->insertOne($request);
    }

    public function insertPost(Request $request) {
        $postController = new _PostController;
        return $postController->insertOne($request);
    }

    public function insertBookmark(Request $request) {
        $bookmarkController = new _BookmarkController;
        return $bookmarkController->insertOne($request);
    }

    public function insertUser(Request $request) {
        $userController = new _UserController;
        return $userController->insertOne($request);
    }

    public function uploadImage(Request $request) {
        $imageController = new _ImageController;
        return $imageController->uploadOne($request);
    }

    public function sendEmail(Request $request) {
        $userController = new _UserController;
        return $userController->sendEmail($request);
    }

    public function forgotPassword(Request $request) {
        $userController = new _UserController;
        return $userController->forgotPassword($request);
    }

    public function saveMessage(Request $request){
        $messageController = new _MessageController;
        return $messageController->saveMessage($request);
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

    public function returnRequest(Request $request){

        $requestArray = $request->all();
        //print_r($requestArray);
        //$requestArray = json_decode($requestArray);
        return $requestArray['journeyName'];
    }
}

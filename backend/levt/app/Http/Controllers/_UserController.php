<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


//use App\Models\User as User;


class _UserController extends BaseController
{

    //protected $redirectTo = RouteServiceProvider::HOME;

    use RegistersUsers;
    public function selectUsernamePerID($id){
        return DB::table('users')->where('userid',$id)->value('username');
    }

    public function selectIDPerUsername($username){
        return DB::table('users')->where('username',$username)->value('userID');
    }

    public function selectIDPerJourneyID($id){
        return DB::table('journeys')->where('journeyID',$id)->value('_userID');
    }

    public function selectIDPerPlaceID($id){
        $journeyID = DB::table('places')->where('placeID',$id)->value('_journeyID');
        return DB::table('journeys')->where('journeyID',$journeyID)->value('_userID');
    }

    public function selectIDPerPostID($id){
        $placeID = DB::table('posts')->where('postID',$id)->value('_placeID');
        $journeyID = DB::table('places')->where('placeID',$placeID)->value('_journeyID');
        return DB::table('journeys')->where('journeyID',$journeyID)->value('_userID');
    }


    public function validateUser(Request $request, $userID){
        $header = getallheaders();
        $headerSessionID = $header['Sessionid'];
        $headerUserID = $header['Userid'];
        $DBsessionID = DB::table('users')->where('userID',$headerUserID)->value('sessionID');
        //wenn Sessions nicht übereinstimmen
        //Wenn Session in DB leer is
        //wenn userID im Header nicht mit userID im content übereinstimmt
        if($headerSessionID != $DBsessionID || $DBsessionID == null || $userID != $headerUserID){
            $outputArray = [
                'userID' => null,
                'username' => null,
                'password' => null,
                'emailAddress' => null,
                'birthday' => null,
                '_countryOfResidenceID' => null,
                //'remember_token' => null,
                'gamificationPoints' => null,
                '_profileImageID' => null,
                'sessionID' => null,
                'explorerBadgeProgress' => null,
                'pioneerBadgeProgress' => null,
                'age' => null,
                'countryName' => null,
                'userImgSrc' => null,
                'pwClear' => null
            ];
            return '{"user": '.json_encode($outputArray,JSON_PRETTY_PRINT)." \n}";
        } else {
            return true;
        }
    }


    public function selectOne($username){
        $imageController = new _ImageController;
        $countryController = new _CountryController;

        $outputUserArray = json_decode(json_encode(DB::table('users')->where('username',$username)->get()),true);

        $outputUser = $outputUserArray[0];
        $outputArray = [
            'userID' => $outputUser['userID'],
            'username' => $outputUser['username'],
            'password' => null,
            'emailAddress' => $outputUser['email'],
            'birthday' => $outputUser['birthday'],
            '_countryOfResidenceID' => $outputUser['_countryOfResidenceID'],
            //'remember_token' => $outputUser['remember_token'],
            'gamificationPoints' => $outputUser['gamificationPoints'],
            '_profileImageID' => $outputUser['_profileImageID'],
            'sessionID' => $this->createSessionID(),
            'explorerBadgeProgress' => null, //aus DB
            'pioneerBadgeProgress' => null, // aus DB
            'age' => null, //Berechnen
            'countryName' => $countryController->selectNamePerID($outputUser['_countryOfResidenceID']),
            'userImgSrc' => null, //aus DB
            'pwClear' => null,
        ];

        return '{"user": '.json_encode($outputArray,JSON_PRETTY_PRINT)." \n}"; 
    }

    public function createSessionID(){
        $sessionID = Str::random(50);
        return $sessionID;
    }

    public function insertOne(Request $request){
        $imageController = new _ImageController;
        //$registerController = new RegisterController;
        $countryController = new _CountryController;

        $requestArray = $request->all();

        $user = User::create([
            'username' => $requestArray['username'],
            'password' => $requestArray['password'],
            'email' => $requestArray['emailAddress'],
            'birthday' => $requestArray['birthday'],
            '_countryOfResidenceID' => $requestArray['_countryOfResidenceID'],
            'remember_token' => $requestArray['remember_token'],
            'gamificationPoints' => $requestArray['gamificationPoints'],
            '_profileImageID' => $requestArray['_profileImageID'],
            'sessionID' => $this->createSessionID()
        ]);

        $user->sendEmailVerificationNotification();

        return $this->selectOne($user['username']);
    }


    public function login(Request $request){
        $imageController = new _ImageController;
        $countryController = new _CountryController;

        $requestArray = $request->all();

        $username = $requestArray['username'];
        $password = $requestArray['password'];

        DB::table('users')->where('username',$username)->where('password',$password)->update([
            'sessionID' => $this->createSessionID()
        ]);

        $userArray = json_decode(json_encode(DB::table('users')->where('username',$username)
            ->where('password',$password)->get()),true);
        if($userArray === null){
            $outputArray = [
                'userID' => null,
                'username' => $requestArray['username'],
                'password' => $requestArray['password'],
                'emailAddress' => $requestArray['emailAddress'],
                'birthday' => $requestArray['birthday'],
                '_countryOfResidenceID' => $requestArray['_countryOfResidenceID'],
                //'remember_token' => $requestArray['remember_token'],
                'gamificationPoints' => $requestArray['gamificationPoints'],
                '_profileImageID' => $requestArray['_profileImageID'],
                'sessionID' => null,
                'explorerBadgeProgress' => $requestArray['explorerBadgeProgress'],
                'pioneerBadgeProgress' => $requestArray['pioneerBadgeProgress'],
                'age' => $requestArray['age'],
                'countryName' => $requestArray['countryName'],
                'userImgSrc' => $requestArray['userImgSrc'],
                'pwClear' => $requestArray['pwClear'],
            ];
        } else {
            return $this->selectOne($username);
        }
    }


    public function logout(Request $request){
        $requestArray = $request->all();
        $userID = $requestArray['userID'];
        $userController = new _UserController;

        $validateUser = $userController->validateUser($request,$userID);
        if($validateUser !== true){
            return $validateUser;
        }

        DB::table('users')->where('userID',$userID)->update([
            'sessionID' => null
        ]);

        $outputArray = [
            'userID' => null,
            'username' => null,
            'password' => null,
            'emailAddress' => null,
            'birthday' => null,
            '_countryOfResidenceID' => null,
            //'remember_token' => null,
            'gamificationPoints' => null,
            '_profileImageID' => null,
            'sessionID' => null,
            'explorerBadgeProgress' => null,
            'pioneerBadgeProgress' => null,
            'age' => null,
            'countryName' => null,
            'userImgSrc' => null,
            'pwClear' => null,
        ];

        return '{"user": '.json_encode($outputArray,JSON_PRETTY_PRINT)." \n}"; 
    }

    //     return $this->existsOne($requestArray['username']);
    //     if($this->existsOne($requestArray['username'])=="false"){
    //     $id = DB::table('users')->insertGetId($insertUserArray);

    //     return $this->selectOne($id);
    //     } 
    //     else {
    //         $outputArray = [
    //             //"freeUsername" => $this->existsOne('username')
    //             "freeUsername ".$requestArray['username'] => $this->existsOne('username')
    //         ];
    //         return json_encode($outputArray,JSON_PRETTY_PRINT);
    //     }
    // }

    // public function existsOne($username){
    //     $user = User::where([['username', '=',$username]]);
    //     return JSON_ENCODE($user->exists());
    // }
}

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
use Carbon\Carbon;


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
        $DBsessionID = DB::table('users')->where('userID',$userID)->value('sessionID');
        //wenn Sessions nicht übereinstimmen
        //Wenn Session in DB leer is
        if($headerSessionID != $DBsessionID || $DBsessionID == null){
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
            'age' => Carbon::parse($outputUser['birthday'])->age,
            'countryName' => $countryController->selectNamePerID($outputUser['_countryOfResidenceID']),
            'userImgSrc' => $imageController->selectSrcPerUserID($outputUser['userID']),
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


    public function updateOne(Request $request){
        $userController = new _UserController;

        $requestArray = $request->all();

        $userID = $requestArray['userID'];

        $validateUser = $userController->validateUser($request,$userID);
        if($validateUser !== true){
            return $validateUser;
        }

        $user = User::find($userID);
        $user->username = $requestArray['username'];
        $user->email = $requestArray['emailAddress'];
        $user->birthday = $requestArray['birthday'];
        $user->_countryOfResidenceID = $requestArray['_countryOfResidenceID'];
        $user->gamificationPoints = $requestArray['gamificationPoints'];
        $user->_profileImageID = $requestArray['_profileImageID'];
        //explorerBadgeProgress
        //pioneerBadgeProgress

        $user->save();
        return $this->selectOne($user->username);
    }


    public function checkIfExistsPerUsername(Request $request){
        $requestArray = $request->all();
        $username = $requestArray['username'];
        if(DB::table('users')->where('username',$username)->count() == 0){
            return '{"free" : true}';
        } else {
            return '{"free" : false}';
        }
    }

    public function checkIfExistsPerEmail(Request $request){
        $requestArray = $request->all();
        $email = $requestArray['emailAddress'];
        if(DB::table('users')->where('email',$email)->count() == 0){
            return '{"free" : true}';
        } else {
            return '{"free" : false}';
        }
    }

    public function updatePassword(Request $request){
        $userController = new _UserController;

        $requestArray = $request->all();

        //$email = $requestArray['emailAddress'];
        $userID = $requestArray['userID'];
        $oldPassword = $requestArray['pwClear'];
        $newPassword = $requestArray['password'];

        $validateUser = $userController->validateUser($request,$userID);
        if($validateUser !== true){
            return $validateUser;
        }
        $user = User::find($userID);
        //$user = json_decode(json_encode(DB::table('users')->where('userID',$userID)->get()),true);
        if ($oldPassword == $user['password']){
            $user->password = $newPassword;
            $user->save();
            return $this->selectOne($user->username);
        } else {
            return '{"oldPassword" : false}';
        }
    }
}

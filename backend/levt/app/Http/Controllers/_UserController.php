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

            return null;
        } else {
            // if(DB::table('users')->where('userID',$userID)->value('email_verified_at') == null){
            //     return '"verified" : false';
            // } else {
            return true;
            //}
        }
    }


    public function selectOne($username){
        $imageController = new _ImageController;
        $countryController = new _CountryController;

        $outputUserArray = json_decode(json_encode(DB::table('users')->where('username',$username)->get()),true);

        $outputUser = $outputUserArray[0];

        $explorerBadgeProgress =DB::table('userbadges')->where([
            ['_userID',$outputUser['userID']],
            ['_badgeID',2]])->value('progress');


        $pioneerBadgeProgress= DB::table('userbadges')->where([
            ['_userID',$outputUser['userID']],
            ['_badgeID',1]])->value('progress');


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
            'sessionID' => $outputUser['sessionID'],
            'explorerBadgeProgress' => $explorerBadgeProgress,
            'pioneerBadgeProgress' => $pioneerBadgeProgress ,
            'age' => Carbon::parse($outputUser['birthday'])->age,
            'countryName' => $countryController->selectNamePerID($outputUser['_countryOfResidenceID']),
            'userImgSrc' => $imageController->selectSrcPerUserID($outputUser['userID']),
            'pwClear' => null,
            'email_verified_at' => $outputUser['email_verified_at']
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function createSessionID(){
        $sessionID = Str::random(50);
        return $sessionID;
    }

    public function insertOne(Request $request){
        $imageController = new _ImageController;
        $countryController = new _CountryController;

        $requestArray = $request->all();

        $user = User::create([
            'username' => $requestArray['username'],
            //'password' => $requestArray['password'],
            'password' => Hash::make($requestArray['password']),
            'email' => $requestArray['emailAddress'],
            'birthday' => $requestArray['birthday'],
            '_countryOfResidenceID' => $requestArray['_countryOfResidenceID'],
            //'remember_token' => $requestArray['remember_token'],
            'gamificationPoints' => $requestArray['gamificationPoints'],
            '_profileImageID' => $requestArray['_profileImageID'],
            'sessionID' => $this->createSessionID()
        ]);



        $insertPioneerArray=[
            '_badgeID' => 1,
            '_userID'=> $this->selectIDPerUsername($requestArray['username']),
            'progress' => 0
        ];

        $insertExplorerArray=[
            '_badgeID' => 2,
            '_userID'=> $this->selectIDPerUsername($requestArray['username']),
            'progress' => 0
        ];

        DB::table('userbadges')->insertGetId($insertPioneerArray);
        DB::table('userbadges')->insertGetId($insertExplorerArray);


        $user->sendEmailVerificationNotification();

        return $this->selectOne($user['username']);
    }


    public function login(Request $request){
        $imageController = new _ImageController;
        $countryController = new _CountryController;

        $requestArray = $request->all();

        $username = $requestArray['username'];
        $password = $requestArray['password'];

        $user = json_decode(json_encode(DB::table('users')->where('username',$username)->first()),true);
        if (hash::check($password,$user['password'])){
            $userID = $this->selectIDPerUsername($username);
            $user = User::find($userID);
            $user->sessionID = $this->createSessionID();
            $user->save();
            // if($user->email_verified_at == null){
            //     return '"verified" : false';
            // } else {
                return $this->selectOne($username);
            //}
        } else {
            $outputArray = [
                'userID' => null,
                'username' => $requestArray['username'],
                'password' => $requestArray['password'],
                'emailAddress' => $requestArray['emailAddress'],
                'birthday' => $requestArray['birthday'],
                '_countryOfResidenceID' => $requestArray['_countryOfResidenceID'],
                'gamificationPoints' => $requestArray['gamificationPoints'],
                '_profileImageID' => $requestArray['_profileImageID'],
                'sessionID' => null,
                'explorerBadgeProgress' => $requestArray['explorerBadgeProgress'],
                'pioneerBadgeProgress' => $requestArray['pioneerBadgeProgress'],
                'age' => $requestArray['age'],
                'countryName' => $requestArray['countryName'],
                'userImgSrc' => $requestArray['userImgSrc'],
                'pwClear' => $requestArray['pwClear'],
                'email_verified_at' => null
            ];
            return $outputArray;
        }
    }


    public function logout(Request $request){
        $requestArray = $request->all();
        $userID = $requestArray['userID'];

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
            'gamificationPoints' => null,
            '_profileImageID' => null,
            'sessionID' => null,
            'explorerBadgeProgress' => null,
            'pioneerBadgeProgress' => null,
            'age' => null,
            'countryName' => null,
            'userImgSrc' => null,
            'pwClear' => null,
            //'email_verified_at' => null
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }


    public function updateOne(Request $request){
        $mail = false;

        $requestArray = $request->all();

        $userID = $requestArray['userID'];

        $validateUser = $this->validateUser($request,$userID);
        if($validateUser !== true){
            return $validateUser;
        }

        $user = User::find($userID);
        if ($user->email != $requestArray['emailAddress']){
            $mail = true;
            $user->email_verified_at = null;
        }
        $user->username = $requestArray['username'];
        $user->email = $requestArray['emailAddress'];
        $user->birthday = $requestArray['birthday'];
        $user->_countryOfResidenceID = $requestArray['_countryOfResidenceID'];
        $user->gamificationPoints = $requestArray['gamificationPoints'];
        $user->_profileImageID = $requestArray['_profileImageID'];
        //explorerBadgeProgress
        //pioneerBadgeProgress
        $user->save();

        DB::table('userbadges')->where([
            ['_userID',$requestArray['userID']],
            ['_badgeID',2]])->update(['progress'=>$requestArray['explorerBadgeProgress']]);

        DB::table('userbadges')->where([
            ['_userID',$requestArray['userID']],
            ['_badgeID',1]])->update(['progress'=>$requestArray['pioneerBadgeProgress']]);




        if ($mail) $user->sendEmailVerificationNotification();
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
        $requestArray = $request->all();

        //$email = $requestArray['emailAddress'];
        $userID = $requestArray['userID'];
        $oldPassword = $requestArray['pwClear'];
        $newPassword = $requestArray['password'];

        $validateUser = $this->validateUser($request,$userID);
        if($validateUser !== true){
            return $validateUser;
        }
        $user = User::find($userID);
        if (hash::check($oldPassword,$user['password'])){
            $user->password = Hash::make($newPassword);
            $user->save();
            return $this->selectOne($user->username);
        } else {
            return '{"oldPassword" : false}';
        }
    }

    public function sendEmail(Request $request){
        $requestArray = $request->all();
        $username = $requestArray['username'];
        $userID = $this->selectIDPerUsername($username);
        $user = User::find($userID);
        $user->email_verified_at = null;
        $user->save();
        $user->sendEmailVerificationNotification();
        return '"email" : true';
    }

    public function forgotPassword(Request $request){
        $requestArray = $request->all();
        $email = $requestArray['emailAddress'];
        $userID = DB::table('users')->where('email',$email)->value('userID');
        if($userID == null){
            return '"email" : false';
        }
        $user = User::find($userID);
        $token = app('auth.password.broker')->createToken($user);
        $user->sendPasswordResetNotification($token);
        return '"email" : true';
    }

    public function emailVerified(Request $request){
        $requestArray = $request->all();
        $username = $requestArray['username'];
        $emailVerifiedAt=DB::table('users')->where('username',$username)->value('email_verified_at');
        if($emailVerifiedAt==null){
            return '"email_verified_at":false';
        }else{
            return '"email_verified_at":true';
        }

    }

    public function loadLoggedInUser(Request $request){
        $requestArray = $request->all();
        $username=$requestArray['username'];
        $userID=$requestArray['userID'];

        $validateUser = $this->validateUser($request,$userID);
        if($validateUser !== true){
            return $validateUser;
        }

       return  $this->selectOne($username);


    }
}

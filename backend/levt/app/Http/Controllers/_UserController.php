<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
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

    public function registerOne(Request $request){
        $requestArray = $request->all();
        $imageController = new _ImageController;

        //Create DB table object
        $insertUserArray = [
            'username' => $requestArray['username'],
            'pwHash' => $requestArray['pwHash'],
            '_profileImageID' => $imageController->selectIDPerSrc($requestArray['userImgSrc']),
            'emailAddress' => $requestArray['emailAddress'],
            'birthday' => $requestArray['birthday'],
            '_countryOfResidenceID' => $requestArray['_countryOfResidenceID'],
            'apiToken' => $requestArray['sessionID'],
            'gamificationPoints' => $requestArray['gamificationPoints']
        ];

        $id = DB::table('users')->insertGetId($insertUserArray);

        return $this->selectOne($id);
    }



    public function selectOne($id){
        $imageController = new _ImageController;
        $countryController = new _CountryController;

        $usersArray = json_decode(json_encode(DB::table('users')->where('userID',$id)->get()), true);
        $userArray = $usersArray[0];

        $outputArray = [
            'userID' => $userArray['userID'],
            'username' => $userArray['username'],
            'pwHash' => $userArray['pwHash'],
            '_profileImageID' => $userArray['_profileImageID'],
            'emailAddress' => $userArray['emailAddress'],
            'birthday' => $userArray['birthday'],
            '_countryOfResidenceID' => $userArray['_countryOfResidenceID'],
            'sessionID' => $userArray['apiToken'],
            'explorerBadgeProgress' => null,
            'pioneerBadgeProgress' => null,
            'age' => Carbon::createFromDate($userArray['birthday'])->age,
            'userImgSrc' => $imageController->selectSrcPerImageID($userArray['_profileImageID']),
            'countryName' => $countryController->selectNamePerID($userArray['_countryOfResidenceID']),
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function insertOne(Request $request){
        $imageController = new _ImageController;

        $requestArray = $request->all();

        //Create DB table object
        $insertUserArray = [
            'username' => $requestArray['username'],
            'pwHash' => $requestArray['pwHash'],
            '_profileImageID' => $imageController->selectIDPerSrc($requestArray['userImgSrc']),
            'emailAddress' => $requestArray['emailAddress'],
            'birthday' => $requestArray['birthday'],
            '_countryOfResidence' => $requestArray['_countryOfResidence'],
            '_genderID' => $requestArray['_genderID'],
            'firstName' => $requestArray['firstName'],
            'lastName' => $requestArray['lastName']
        ];

        //return $this->existsOne($requestArray['username']);
        if($this->existsOne($requestArray['username'])=="false"){
        $id = DB::table('users')->insertGetId($insertUserArray);

        return $this->selectOne($id);
        } 
        else {
            $outputArray = [
                //"freeUsername" => $this->existsOne('username')
                "freeUsername ".$requestArray['username'] => $this->existsOne('username')
            ];
            return json_encode($outputArray,JSON_PRETTY_PRINT);
        }
    }

    public function existsOne($username){
        $user = User::where([['username', '=',$username]]);
        return JSON_ENCODE($user->exists());
    }
}

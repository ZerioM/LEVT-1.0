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

    // public function selectOne($id){
    //     $imageController = new _ImageController;
    //     $countryController = new _CountryController;
    //     $journeyController = new _JourneyController;

    //     $usersArray = json_decode(json_encode(DB::table('users')->where('userID',$id)->get()), true);
    //     $userArray = $usersArray[0];
    //     //$journeysArray = json_decode(json_encode($journeyController->selectByUserID($id)->get()),true);

    //     // $outputJourneysArray = array();
    //     // foreach ($journeysArray as $journeyArray) {
    //     //     $outputJourneyArray = array();
    //     //     $outputJourneyArray = [
    //             // '_userID' => null,
    //             // '_thumbnailID' => $journeyArray['_thumbnailID'],
    //             // 'journeyName' => $journeyArray['journeyName'],
    //             // '_seasonID' => $journeyArray['_seasonID'],
    //             // '_journeyCategoryID' => $journeyArray['_journeyCategoryID'],
    //             // '_companionshipID' => $journeyArray['_companionshipID'],
    //             // 'year' => $journeyArray['year'],
    //             // 'detail' => $journeyArray['detail'],
    //             // 'duration' => $journeyArray['duration'],
    //             // 'cost' => $journeyArray['totalCosts'],
    //             // 'thumbnailSrc' => $imageController->selectSrcPerImageID($placeArray['_thumbnailID']),
    //             // 'countryName' => $countryController->selectNamePerID($placeArray['_countryID'])
    //         //]; // nur JourneyIDs?

            

    //        // array_push($outputJourneysArray,$outputJourneyArray);
    //     //}

    //     //$journeysArray = 


    //     $outputArray = [
    //         'userID' => $userArray['userID'],
    //         'username' => $userArray['username'],
    //         'pwHash' => $userArray['pwHash'],
    //         '_profileImageID' => $userArray['_profileImageID'],
    //         'emailAddress' => $userArray['emailAddress'],
    //         'birthday' => $userArray['birthday'],
    //         '_countryOfResidence' => $userArray['_countryOfResidence'],
    //         '_genderID' => $userArray['_genderID'],
    //         'firstName' => $userArray['firstName'],
    //         'lastName' => $userArray['lastName'],
    //         'thumbnailSrc' => $imageController->selectSrcPerImageID($userArray['_profileImageID']),
    //         'countryName' => $countryController->selectNamePerID($userArray['_countryOfResidence']),
    //         //'journeys' => $outputJourneysArray
    //     ];

    //     return json_encode($outputArray,JSON_PRETTY_PRINT);
    // }

    // public function insertOne(Request $request){
    //     $imageController = new _ImageController;

    //     $requestArray = $request->all();

    //     //Create DB table object
    //     $insertUserArray = [
    //         'username' => $requestArray['username'],
    //         'pwHash' => $requestArray['pwHash'],
    //         '_profileImageID' => $imageController->selectIDPerSrc($requestArray['userImgSrc']),
    //         'emailAddress' => $requestArray['emailAddress'],
    //         'birthday' => $requestArray['birthday'],
    //         '_countryOfResidence' => $requestArray['_countryOfResidence'],
    //         '_genderID' => $requestArray['_genderID'],
    //         'firstName' => $requestArray['firstName'],
    //         'lastName' => $requestArray['lastName']
    //     ];

    //     //return $this->existsOne($requestArray['username']);
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

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Journey as Journey;
use App\Models\User as User;

class _JourneyController extends BaseController
{
    //
    public function insertOne(Request $request){

        $userController = new _UserController;
        $imageController = new _ImageController;
        $seasonController = new _SeasonController;
        $companionshipController = new _CompanionshipController;
        $journeyCategoryController = new _JourneyCategoryController;

        //Create DB table object

            //$userID = $userController->selectIDPerUsername($request->input('username'));
            //$thumbnailID = $imageController->selectIDPerSrc($request->input('thumbnailSrc'));

            $insertJourneyArray = [
                '_userID' => $userController->selectIDPerUsername($request->input('username')),
                '_thumbnailID' => $imageController->selectIDPerSrc($request->input('thumbnailSrc')),
                'journeyName' => $request->input('journeyName'),
                '_seasonID' => $seasonController->selectIDPerName($request->input('seasonName')),
                '_journeyCategoryID' => $request->input('journeyCategoryID'),
                '_companionshipID' => $request->input('companionshipID'),
                'year' => $request->input('year'),
                'detail' => $request->input('detail'),
                'duration' => $request->input('duration'),
                'cost' => $request->input('cost'),
            ];



        //insert data and retrieve the new id of the journey
            $id = DB::table('journeys')->insertGetId($insertJourneyArray);

            $costcontroller = new _CostController;


            if($request->input('cost') == null){
                if($request->input('activityCosts') != null)
                    $costcontroller->insertOne($id,1,$request->input('activityCosts'));
                if($request->input('accomodationCosts') != null)
                    $costcontroller->insertOne($id,2,$request->input('accomodationCosts'));
                if($request->input('foodCosts') != null)
                    $costcontroller->insertOne($id,3,$request->input('foodCosts'));
                if($request->input('transportCosts') != null)
                    $costcontroller->insertOne($id,4,$request->input('transportCosts'));
                if($request->input('otherCosts') != null)
                    $costcontroller->insertOne($id,5,$request->input('otherCosts'));
            }



        //build an business layer object as per interface
            $userImgSrc = $imageController->selectSrcPerUserID($request->input('userID'));
            $companionship = $companionshipController->selectTypePerID($request->input('companionshipID'));
            $journeyCategory = $journeyCategoryController->selectNamePerID($request->input('journeyCategoryID'));

            $outputArray = [
                'journeyID' => $id,
                'name' => $request->input('journeyName'),
                'username' => $request->input('username'),
                'userImgSRC' => $userImgSrc,
                'bookmarks' => null,
                'season' => $request->input('seasonName'),
                'year' => $request->input('year'),
                'duration' => $request->input('duration'),
                'journeyCategory' => $journeyCategory,
                'companionship' => $companionship,
                'detail' => $request->input('detail'),
                'totalCosts' => $request->input('cost'),
                'activityCosts' => $request->input('activityCosts'),
                'accomodationCosts' => $request->input('accomodationCosts'),
                'foodCosts' => $request->input('foodCosts'),
                'transportCosts' => $request->input('transportCosts'),
                'otherCosts' => $request->input('otherCosts'),
                'places' => null,
                'thumbnailSrc' => $request->input('thumbnailSrc')
            ];

           /* Maybe we use a transaction

           DB::transaction(function()
            {
                $newAcct = Account::create([
                    'accountname' => Input::get('accountname')
                ]);

                $newUser = User::create([
                    'username' => Input::get('username'),
                    'account_id' => $newAcct->id,
                ]);
            });*/

        //return the business layer object as pretty json
        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }
}

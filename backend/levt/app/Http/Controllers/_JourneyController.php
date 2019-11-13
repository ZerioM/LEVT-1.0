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
        $costcontroller = new _CostController;
        $journeyTransportController = new _JourneyTransportController;

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



            if($request->input('cost') == null){
                if($request->input('activityCosts') != null)
                    $costcontroller->insertOne($id,'leisure',$request->input('activityCosts'));
                if($request->input('accomodationCosts') != null)
                    $costcontroller->insertOne($id,'accommodation',$request->input('accomodationCosts'));
                if($request->input('foodCosts') != null)
                    $costcontroller->insertOne($id,'mealsanddrinks',$request->input('foodCosts'));
                if($request->input('transportCosts') != null)
                    $costcontroller->insertOne($id,'transportation',$request->input('transportCosts'));
                if($request->input('otherCosts') != null)
                    $costcontroller->insertOne($id,'other',$request->input('otherCosts'));
            }

            if($request->input('plane') != null){
                $journeyTransportController->insertOne($id,'plane');
            }
            if($request->input('car') != null){
                $journeyTransportController->insertOne($id,'car');
            }
            if($request->input('bus') != null){
                $journeyTransportController->insertOne($id,'bus');
            }
            if($request->input('train') != null){
                $journeyTransportController->insertOne($id,'train');
            }
            if($request->input('ship') != null){
                $journeyTransportController->insertOne($id,'ship');
            }
            if($request->input('motorbike') != null){
                $journeyTransportController->insertOne($id,'motorbike');
            }
            if($request->input('campingtrailer') != null){
                $journeyTransportController->insertOne($id,'campingtrailer');
            }
            if($request->input('hiking') != null){
                $journeyTransportController->insertOne($id,'hiking');
            }
            if($request->input('bicycle') != null){
                $journeyTransportController->insertOne($id,'bicycle');
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
                'thumbnailSrc' => $request->input('thumbnailSrc'),
                'plane' => $request->input('plane'),
                'car' => $request->input('car'),
                'bus' => $request->input('bus'),
                'train' => $request->input('train'),
                'ship' => $request->input('ship'),
                'motorbike' => $request->input('motorbike'),
                'campingtrailer' => $request->input('campingtrailer'),
                'hiking' => $request->input('hiking'),
                'bicycle' => $request->input('bicycle')
            ];

           /* Maybe we use a transaction

            in case of an error, at the moment some data would be inserted, some wouldn't
            a transaction would prevent this by executing all statements together and rollbacking it
            if errors occur

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

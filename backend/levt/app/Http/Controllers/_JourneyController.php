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

        //Create DB table object
            $insertJourneyArray = [
                '_userID' => $request->input('userID'),
                '_thumbnailID' => $request->input('thumbnailID'),
                'journeyName' => $request->input('journeyName'),
                '_seasonID' => $request->input('seasonID'),
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
                    $costcontroller->insert($id,1,$request->input('activityCosts'));
                if($request->input('accomodationCosts') != null)
                    $costcontroller->insert($id,2,$request->input('accomodationCosts'));
                if($request->input('foodCosts') != null)
                    $costcontroller->insert($id,3,$request->input('foodCosts'));
                if($request->input('transportCosts') != null)
                    $costcontroller->insert($id,4,$request->input('transportCosts'));
                if($request->input('otherCosts') != null)
                    $costcontroller->insert($id,5,$request->input('otherCosts'));
            }



        //build an business layer object as per interface
            $username = DB::table('users')->where('userid',$request->input('userID'))->value('username');
            $userImgSrc = DB::table('images')
                                        ->join('users','images.imageID','=','users._profileImageID')
                                        ->where('userid',$request->input('userID'))->value('src');
            $season = DB::table('seasons')->where('seasonid',$request->input('seasonID'))->value('seasonName');
            $companionship = DB::table('companionships')->where('companionshipID',$request->input('companionshipID'))->value('companionshipType');
            $thumbnailSRC = DB::table('images')->where('imageID',$request->input('thumbnailID'))->value('src');

            $outputArray = [
                'journeyID' => $id,
                'name' => $request->input('journeyName'),
                'username' => $username,
                'userImgSRC' => $userImgSrc,
                'bookmarks' => null,
                'season' => $season,
                'year' => $request->input('year'),
                'duration' => $request->input('duration'),
                'companionship' => $companionship,
                'detail' => $request->input('detail'),
                'totalCosts' => $request->input('cost'),
                'activityCosts' => $request->input('activityCosts'),
                'accomodationCosts' => $request->input('accomodationCosts'),
                'foodCosts' => $request->input('foodCosts'),
                'transportCosts' => $request->input('transportCosts'),
                'otherCosts' => $request->input('otherCosts'),
                'thumbnailSrc' => $thumbnailSRC
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

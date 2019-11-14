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

    public function selectAllLimit(){
        //Abfrage Users mit Journeys und Images und Likes und Places und Countries joinen,
        //dann TOP 100 vong Bookmarks her

        $result = DB::select('SELECT journeys.journeyID,journeys.journeyName as name,users.username,
                    profileImage.src as userImgSrc, COUNT(bookmarks.bookmarkID) AS bookmarks,
                    seasons.seasonName as season, journeys.year,
                    null as duration, null as companionship, null as detail, null as totalCosts,
                    null as activityCosts, null as accommodationgCosts, null as foodCosts,
                    null as transportCosts, null as otherCosts,
                    null as places,thumbnailImage.src as thumbnailSrc
                    FROM journeys
                    INNER JOIN users ON journeys._userID = users.userID
                    INNER JOIN images AS profileImage ON users._profileImageID = profileImage.imageID
                    INNER JOIN images AS thumbnailImage ON journeys._thumbnailID = thumbnailImage.imageID
                    INNER JOIN bookmarks ON journeys.journeyID = bookmarks._journeyID
                    INNER JOIN seasons on journeys._seasonID = seasons.seasonID
                    GROUP BY journeys.journeyID
                    ORDER BY bookmarks DESC
                    LIMIT 100;');

        //return '"journeys":{ '.json_encode($result, JSON_PRETTY_PRINT)." \n}";
        return '{"journeys": '.json_encode($result, JSON_PRETTY_PRINT)." \n}";

    }

    public function selectOne(Request $request){
        $userController = new _UserController;
        $imageController = new _ImageController;
        $bookmarkController = new _BookmarkController;
        $seasonController = new _SeasonController;
        $journeyCategoryController = new _JourneyCategoryController;
        $companionshipController = new _CompanionshipController;
        $costController = new _CostController;
        $placeController = new _PlaceController;
        $journeyTransportController = new _journeyTransportController;

        $id = $request->input('journeyID');

        $journeysArray = json_decode(json_encode(DB::table('journeys')->where('journeyID',$id)->get()), true);
        $journeyArray = $journeysArray[0];
        print_r($journeyArray); //Records aus der Datenbank ist kein Array
        $placesArray = $placeController->selectByJourneyIDWithoutChildren($id);

         $outputArray = [
            'journeyID' => $id,
            'name' => $journeyArray['journeyName'],
            'username' => $userController->selectUsernamePerID($journeyArray['_userID']),
            'userImgSrc' => $imageController->selectSrcPerUserID($journeyArray['_userID']),
            'bookmarks' => $bookmarkController->selectCountBookmarksPerJourneyID($id),
            'season' => $seasonController->selectNameByID($journeyArray['_seasonID']),
            'year' => $journeyArray['year'],
            'duration' => $journeyArray['duration'],
            'journeyCategory' => $journeyCategoryController->selectNamePerID($journeyArray['_journeyCategoryID']),
            'companionship' => $companionshipController->selectTypePerID($journeyArray['_companionshipID']),
            'detail' => $journeyArray['detail'],
            'totalCosts' => $journeyArray['cost'],
            'leisureCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'leisure'),
            'accommodationCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'accommodation'),
            'mealsanddrinkCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'mealsanddrinks'),
            'transportationCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'transport'),
            'otherCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'other'),
            'places' => null, //das gehört noch gemacht
            'thumbnailSrc' => $imageController->selectSrcPerImageID($journeyArray['_thumbnailID']), 
            'plane' => $journeyTransportController->selectByJourneyIDAndType($id, 'plane'),
            'car' => $journeyTransportController->selectByJourneyIDAndType($id, 'car'),
            'bus' => $journeyTransportController->selectByJourneyIDAndType($id, 'bus'),
            'train' => $journeyTransportController->selectByJourneyIDAndType($id, 'train'),
            'ship' => $journeyTransportController->selectByJourneyIDAndType($id, 'ship'),
            'motorBike' => $journeyTransportController->selectByJourneyIDAndType($id, 'motorbike'),
            'campingTrailer' => $journeyTransportController->selectByJourneyIDAndType($id, 'campingTrailer'),
            'hiking' => $journeyTransportController->selectByJourneyIDAndType($id, 'hiking'),
            'bicycle' => $journeyTransportController->selectByJourneyIDAndType($id, 'bisycle')
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }
}

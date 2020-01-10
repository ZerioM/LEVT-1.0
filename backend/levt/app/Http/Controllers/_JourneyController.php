<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

use App\Models\Journey as Journey;
use App\Models\User as User;

class _JourneyController extends BaseController
{
    public function selectByUserID($userID){
        return DB::table('journeys')->where('_userID', $userID);
    }

    public function selectJourneyByCountryIDOfPlace($countryID){
        $placeController = new _PlaceController;

        $placesInThatCountry = json_decode(json_encode($placeController->selectByCountryID($countryID)),true);

        $journeyIDs = array();

        $journeysArray = array();
        foreach($placesInThatCountry as $place){
            $journeyIDofPlace = $place['_journeyID'];

            if(!in_array($journeyIDofPlace,$journeyIDs)){
                array_push($journeyIDs,$journeyIDofPlace);
                $journeyArray = json_decode($this->selectOne($journeyIDofPlace),true);
                array_push($journeysArray,$journeyArray);
            }
        }
        return '{"journeys": '.json_encode($journeysArray,JSON_PRETTY_PRINT)." \n}";
    }

    public function selectOneByPlaceID(Request $request){ //wird die Funktion verwendet?
        $requestArray = $request->all();

        $journeyID = $requestArray['_journeyID'];

        return $this->selectOne($journeyID);
    }


    public function insertOne(Request $request){

        $userController = new _UserController;
        $imageController = new _ImageController;
        $seasonController = new _SeasonController;
        $companionshipController = new _CompanionshipController;
        $journeyCategoryController = new _JourneyCategoryController;
        $costcontroller = new _CostController;
        $journeyTransportController = new _JourneyTransportController;

        $requestArray = $request->all();
        
        //Hier wird überprüft ob der User eingeloggt ist
        $userID = $requestArray['_userID'];
        $validateUser = $userController->validateUser($request,$userID);
        if($validateUser !== true){
            return $validateUser;
        }

        //Create DB table object


            $insertJourneyArray = [
                '_userID' => $requestArray['_userID'],
                '_thumbnailID' => $requestArray['_thumbnailID'], //nullable
                'journeyName' => $requestArray['journeyName'],
                '_seasonID' => $requestArray['_seasonID'],
                '_journeyCategoryID' => $requestArray['_journeyCategoryID'],
                '_companionshipID' => $requestArray['_companionshipID'],
                'year' => $requestArray['year'],
                'detail' => $requestArray['detail'], //nullable, 65.000 Zeichen
                'duration' => $requestArray['duration'],
                'cost' => $requestArray['totalCosts'], //nullable
            ];



        //insert data and retrieve the new id of the journey
            $id = DB::table('journeys')->insertGetId($insertJourneyArray);


        //insert data in costs table
            if($requestArray['totalCosts'] == null){
                if($requestArray['leisureCosts'] != null)
                    $costcontroller->insertOne($id,'leisure',$requestArray['leisureCosts']); //nullable
                if($requestArray['accommodationCosts'] != null)
                    $costcontroller->insertOne($id,'accommodation',$requestArray['accommodationCosts']); //nullable
                if($request['mealsanddrinksCosts'] != null)
                    $costcontroller->insertOne($id,'mealsanddrinks',$request['mealsanddrinksCosts']); //nullable
                if($requestArray['transportationCosts'] != null)
                    $costcontroller->insertOne($id,'transportation',$requestArray['transportationCosts']); //nullable
                if($request['otherCosts'] != null)
                    $costcontroller->insertOne($id,'other',$requestArray['otherCosts']); //nullable
            }

        //insert data in journeyTransports table
            if($requestArray['plane']){
                $journeyTransportController->insertOne($id,'plane'); //nullable
            }
            if($requestArray['car']){
                $journeyTransportController->insertOne($id,'car'); //nullable
            }
            if($requestArray['bus']){
                $journeyTransportController->insertOne($id,'bus'); //nullable
            }
            if($requestArray['train']){
                $journeyTransportController->insertOne($id,'train'); //nullable
            }
            if($requestArray['ship']){
                $journeyTransportController->insertOne($id,'ship'); //nullable
            }
            if($requestArray['motorbike']){
                $journeyTransportController->insertOne($id,'motorbike'); //nullable
            }
            if($requestArray['campingtrailer']){
                $journeyTransportController->insertOne($id,'campingtrailer'); //nullable
            }
            if($requestArray['hiking']){
                $journeyTransportController->insertOne($id,'hiking'); //nullable
            }
            if($requestArray['bicycle']){
                $journeyTransportController->insertOne($id,'bicycle'); //nullable
            }

           /* Maybe we should use a transaction

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
        return $this->selectOne($id);
    }

    public function selectAllLimit(){
        /**
         * Abfrage Users mit Journeys und Images und Likes und Places und Countries joinen,
         * dann TOP 100 vong Bookmarks her
        */

        //Umbau-Möglichkeit:
        // $journeysArray = json_decode(json_encode($this->selectOne($id)->get()),true);

        // $outputJourneysArray = array();
        // foreach ($journeysArray as $journeyArray) {
        //     $outputJourneyArray = array();
        //     $outputJourneyArray = [
        //             'journeyID' => $id,
        //             '_userID' => $journeyArray['_userID'],
        //             '_thumbnailID' => $journeyArray['_thumbnailID'],
        //             '_seasonID' => $journeyArray['_seasonID'],
        //             '_journeyCategoryID' => $journeyArray['_journeyCategoryID'],
        //             '_companionshipID' => $journeyArray['_companionshipID'],
        //             'journeyName' => $journeyArray['journeyName'],
        //             'year' => $journeyArray['year'],
        //             'duration' => null,
        //             'detail' => null,
        //             'totalCosts' => null,

        //             //all from Costs table
        //             'leisureCosts' => null,
        //             'accommodationCosts' => null,
        //             'mealsanddrinkCosts' => null,
        //             'transportationCosts' => null,
        //             'otherCosts' => null,

        //             //all from transport table
        //             'plane' => null,
        //             'car' => null,
        //             'bus' => null,
        //             'train' => null,
        //             'ship' => null,
        //             'motorBike' => null,
        //             'campingTrailer' => null,
        //             'hiking' => null,
        //             'bicycle' => null,

        //             //from places table
        //             'places' => null,

        //             //all from images table
        //             'thumbnailSrc' => $imageController->selectSrcPerImageID($journeyArray['_thumbnailID']),
        //             'userImgSrc' => $imageController->selectSrcPerUserID($journeyArray['_userID']),

        //             //from user table
        //             'username' => $userController->selectUsernamePerID($journeyArray['_userID']),

        //             //from season table
        //             'seasonName' => $seasonController->selectNameByID($journeyArray['_seasonID']),

        //             //from journeycategory table
        //             'journeyCategoryName' => null,

        //             //from companionship table
        //             'companionshipType' => null,

        //             //from bookmarks table
        //             'bookmarks' => $bookmarkController->selectCountBookmarksPerJourneyID($id),
        //       ];

        //     //FEHLT: in richtiger Reihenfolge nach Bookmarks sortieren:
        //       array_push($outputJourneysArray,$outputJourneyArray);
        // }





        $result = DB::select('SELECT journeys.journeyID,journeys.journeyName as journeyName,users.username,
                    profileImage.src as userImgSrc, COUNT(bookmarks.bookmarkID) AS bookmarks,
                    seasons.seasonName as seasonName, journeys.year,
                    null as duration, null as companionship, null as detail, null as totalCosts,
                    null as activityCosts, null as accommodationCosts, null as mealsanddrinksCosts,
                    null as transportCosts, null as otherCosts,
                    null as places,thumbnailImage.src as thumbnailSrc
                    FROM journeys
                    INNER JOIN users ON journeys._userID = users.userID
                    LEFT JOIN images AS profileImage ON users._profileImageID = profileImage.imageID
                    LEFT JOIN images AS thumbnailImage ON journeys._thumbnailID = thumbnailImage.imageID
                    LEFT JOIN bookmarks ON journeys.journeyID = bookmarks._journeyID
                    INNER JOIN seasons on journeys._seasonID = seasons.seasonID
                    GROUP BY journeys.journeyID
                    ORDER BY bookmarks DESC
                    LIMIT 100;');

        return '{"journeys": '.json_encode($result, JSON_PRETTY_PRINT)." \n}";

    }

    public function selectOne($id){
        $userController = new _UserController;
        $imageController = new _ImageController;
        $bookmarkController = new _BookmarkController;
        $seasonController = new _SeasonController;
        $journeyCategoryController = new _JourneyCategoryController;
        $companionshipController = new _CompanionshipController;
        $costController = new _CostController;
        $placeController = new _PlaceController;
        $journeyTransportController = new _JourneyTransportController;
        $countryController = new _CountryController;

        $journeysArray = json_decode(json_encode(DB::table('journeys')->where('journeyID',$id)->get()), true);
        $journeyArray = $journeysArray[0];

        $placesArray = json_decode(json_encode($placeController->selectByJourneyIDWithoutChildren($id)->get()),true);

        $outputPlacesArray = array();

        foreach($placesArray as $place){
            array_push($outputPlacesArray,json_decode($placeController->selectOne($place['placeID']),true));
        }


         $outputArray = [
             //all from journey table
            'journeyID' => $id,
            '_userID' => $journeyArray['_userID'],
            '_thumbnailID' => $journeyArray['_thumbnailID'],
            '_seasonID' => $journeyArray['_seasonID'],
            '_journeyCategoryID' => $journeyArray['_journeyCategoryID'],
            '_companionshipID' => $journeyArray['_companionshipID'],
            'journeyName' => $journeyArray['journeyName'],
            'year' => $journeyArray['year'],
            'duration' => $journeyArray['duration'],
            'detail' => $journeyArray['detail'],
            'totalCosts' => $journeyArray['cost'],

            //all from Costs table
            'leisureCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'leisure'),
            'accommodationCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'accommodation'),
            'mealsanddrinksCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'mealsanddrinks'),
            'transportationCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'transport'),
            'otherCosts' => $costController->selectAllCostsByJourneyIDAndType($id, 'other'),

            //all from transport table
            'plane' => $journeyTransportController->selectByJourneyIDAndType($id, 'plane'),
            'car' => $journeyTransportController->selectByJourneyIDAndType($id, 'car'),
            'bus' => $journeyTransportController->selectByJourneyIDAndType($id, 'bus'),
            'train' => $journeyTransportController->selectByJourneyIDAndType($id, 'train'),
            'ship' => $journeyTransportController->selectByJourneyIDAndType($id, 'ship'),
            'motorbike' => $journeyTransportController->selectByJourneyIDAndType($id, 'motorbike'),
            'campingtrailer' => $journeyTransportController->selectByJourneyIDAndType($id, 'campingtrailer'),
            'hiking' => $journeyTransportController->selectByJourneyIDAndType($id, 'hiking'),
            'bicycle' => $journeyTransportController->selectByJourneyIDAndType($id, 'bicycle'),

            //from places table
            'places' => $outputPlacesArray,

            //all from images table
            'thumbnailSrc' => $imageController->selectSrcPerImageID($journeyArray['_thumbnailID']),
            'userImgSrc' => $imageController->selectSrcPerUserID($journeyArray['_userID']),

            //from user table
            'username' => $userController->selectUsernamePerID($journeyArray['_userID']),

            //from season table
            'seasonName' => $seasonController->selectNameByID($journeyArray['_seasonID']),

            //from journeycategory table
            'journeyCategoryName' => $journeyCategoryController->selectNamePerID($journeyArray['_journeyCategoryID']),

            //from companionship table
            'companionshipType' => $companionshipController->selectTypePerID($journeyArray['_companionshipID']),

            //from bookmarks table
            'bookmarks' => $bookmarkController->selectCountBookmarksPerJourneyID($id),
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }


    public function selectOneWithChildren($id){
        $placeController = new _PlaceController;
        $journey = json_decode($this->selectOne($id),true);
        if($journey['places'] != null){
            $places = $journey['places'];
            $postsArray = array();

            foreach($places as $place){
                if($place['posts'] != null){
                    $postArray = array();
                    $postArray = json_decode($placeController->selectOne($place['placeID']),true);
                    array_push($postsArray,$postArray);
                }
            }
            if($postsArray != []){
                $journey['places'] = $postsArray;
            }
        }
        return $journey;
    }


    public function updateOne(Request $request){

        $costController = new _CostController;
        $journeyTransportController = new _JourneyTransportController;
        $userController = new _UserController;

        $requestArray = $request->all();

        
        //Hier wird überprüft ob der User eingeloggt ist
        $userID = $requestArray['_userID'];
        $validateUser = $userController->validateUser($request,$userID);
        if($validateUser !== true){
            return $validateUser;
        }

        $journey = Journey::find($requestArray['journeyID']);

        $journey->_thumbnailID = $requestArray['_thumbnailID'];
        $journey->_seasonID = $requestArray['_seasonID'];
        $journey->_journeyCategoryID = $requestArray['_journeyCategoryID'];
        $journey->_companionshipID = $requestArray['_companionshipID'];
        $journey->journeyName = $requestArray['journeyName'];
        $journey->year = $requestArray['year'];
        $journey->detail = $requestArray['detail'];
        $journey->duration = $requestArray['duration'];
        $journey->cost = $requestArray['totalCosts'];

        //update data in costs table
        $costController->updateOne($requestArray['journeyID'],'leisure',$requestArray['leisureCosts']); //nullable
        $costController->updateOne($requestArray['journeyID'],'accommodation',$requestArray['accommodationCosts']); //nullable
        $costController->updateOne($requestArray['journeyID'],'mealsanddrinks',$request['mealsanddrinksCosts']); //nullable
        $costController->updateOne($requestArray['journeyID'],'transportation',$requestArray['transportationCosts']); //nullable
        $costController->updateOne($requestArray['journeyID'],'other',$requestArray['otherCosts']); //nullable

        //update data in journeyTransports table

        if($requestArray['plane']){
            $journeyTransportController->ifNotExistsInsertOne($requestArray['journeyID'],'plane'); //nullable
        } else {
            $journeyTransportController->ifExistsDeleteOne($requestArray['journeyID'],'plane');
        }
        if($requestArray['car']){
            $journeyTransportController->ifNotExistsInsertOne($requestArray['journeyID'],'car'); //nullable
        } else {
            $journeyTransportController->ifExistsDeleteOne($requestArray['journeyID'],'car');
        }
        if($requestArray['bus']){
            $journeyTransportController->ifNotExistsInsertOne($requestArray['journeyID'],'bus'); //nullable
        } else {
            $journeyTransportController->ifExistsDeleteOne($requestArray['journeyID'],'bus');
        }
        if($requestArray['train']){
            $journeyTransportController->ifNotExistsInsertOne($requestArray['journeyID'],'train'); //nullable
        } else {
            $journeyTransportController->ifExistsDeleteOne($requestArray['journeyID'],'train');
        }
        if($requestArray['ship']){
            $journeyTransportController->ifNotExistsInsertOne($requestArray['journeyID'],'ship'); //nullable
        } else {
            $journeyTransportController->ifExistsDeleteOne($requestArray['journeyID'],'ship');
        }
        if($requestArray['motorbike']){
            $journeyTransportController->ifNotExistsInsertOne($requestArray['journeyID'],'motorbike'); //nullable
        } else {
            $journeyTransportController->ifExistsDeleteOne($requestArray['journeyID'],'motorbike');
        }
        if($requestArray['campingtrailer']){
            $journeyTransportController->ifNotExistsInsertOne($requestArray['journeyID'],'campingtrailer'); //nullable
        } else {
            $journeyTransportController->ifExistsDeleteOne($requestArray['journeyID'],'campingtrailer');
        }
        if($requestArray['hiking']){
            $journeyTransportController->ifNotExistsInsertOne($requestArray['journeyID'],'hiking'); //nullable
        } else {
            $journeyTransportController->ifExistsDeleteOne($requestArray['journeyID'],'hiking');
        }
        if($requestArray['bicycle']){
            $journeyTransportController->ifNotExistsInsertOne($requestArray['journeyID'],'bicycle'); //nullable
        } else {
            $journeyTransportController->ifExistsDeleteOne($requestArray['journeyID'],'bicycle');
        }


        $journey->save();

        return $this->selectOne($requestArray['journeyID']);
    }

    public function ifExistsDeleteOne(Request $request){

        $requestArray = $request->all();

        $journey = Journey::find($requestArray['journeyID']);

        $journey->delete();

        $outputArray = [
            "deleted" => true
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }


    public function selectAllJourneysPerUser(Request $request){
        $requestArray = $request->all();
        $userID = $requestArray['userID'];
        return $this->selectAllJourneysPerUserID($userID);
    }

    public function selectAllJourneysPerUserID($userID){
        $userJourneys = json_decode(json_encode($this->selectByUserID($userID)->get()),true);
        $journeysArray = array();
        foreach($userJourneys as $userJourney){
            $journeyID = $userJourney['journeyID'];
            $journeyArray = json_decode($this->selectOne($journeyID), true);
            array_push($journeysArray,$journeyArray);
        }
        return '{"journeys": '.json_encode($journeysArray,JSON_PRETTY_PRINT)." \n}";
    }

    public function selectFilteredJourneys(Request $request){
        $countryController = new _CountryController;
        $userController = new _UserController;
        $placeController = new _PlaceController;

        $requestArray = $request->all();
        $searchEntry = $requestArray['searchEntry'];

        //if SearchEntry is a Country:
        $countryID = $countryController->selectIDPerName($searchEntry);
        if($countryID != null){
            return $this->selectJourneyByCountryIDOfPlace($countryID);
        }

        //if SearchEntry is a User:
        $userID = $userController->selectIDPerUsername($searchEntry);
        if($userID != null){
            return $this->selectAllJourneysPerUserID($userID);
        }

        //else: if SearchEntry is a Place:
            $client = new Client();

            $link = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input="
            .$searchEntry
            ."&inputtype=textquery&fields=formatted_address,name,geometry,place_id&language=en&key="
            .env('API_KEY');


            $placeRes = $client->get($link);
            $placeResult = json_decode($placeRes->getBody(),true);
            if ($placeResult['candidates']!=null){
                $latNE = $placeResult['candidates'][0]['geometry']['viewport']['northeast']['lat'];
                $lngNE = $placeResult['candidates'][0]['geometry']['viewport']['northeast']['lng'];
                $latSW = $placeResult['candidates'][0]['geometry']['viewport']['southwest']['lat'];
                $lngSW = $placeResult['candidates'][0]['geometry']['viewport']['southwest']['lng'];

                $placesBetweenCoordinates = json_decode(json_encode($placeController->selectBetweenCoordinates($latSW,$lngSW,$latNE,$lngNE)),true);

                $journeyIDs = array();

                $journeysArray = array();

                foreach($placesBetweenCoordinates as $place){
                    $journeyIDofPlace = $place['_journeyID'];

                    if(!in_array($journeyIDofPlace,$journeyIDs)){
                        array_push($journeyIDs,$journeyIDofPlace);
                        $journeyArray = json_decode($this->selectOne($journeyIDofPlace),true);
                        array_push($journeysArray,$journeyArray);
                    }
                }

                return '{"journeys": '.json_encode($journeysArray,JSON_PRETTY_PRINT)." \n}";
            }

        return null;

    }

}

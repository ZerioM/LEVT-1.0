<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers;


class ReadController extends BaseController
{

    //
    public function loadTopPosts() {
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

    public function selectJourneyCategories(){
        $jcc = new _JourneyCategoryController;
        return $jcc->selectAll();
    }

    public function selectCompanionships(){
        $csc = new _CompanionshipController;
        return $csc->selectAll();
    }

    public function selectTransports(){
        $tsc = new _TransportController;
        return $tsc->selectAll();
    }
}

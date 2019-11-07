<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class Controller extends BaseController
{
    //
    public function loadTopPosts() {
        //Abfrage Users mit Journeys und Images und Likes und Places und Countries joinen,
        //dann TOP 100 vong Bookmarks her

        $result = DB::select('SELECT journeys.journeyID,journeys.journeyName as name,users.username,
                    profileImage.src as userImgSrc, COUNT(bookmarks.bookmarkID) AS bookmarks, journeys.arrivalDate, journeys.departureDate,
                    null as places,thumbnailImage.src as thumbnailSrc
                    FROM journeys
                    INNER JOIN users ON journeys._userID = users.userID
                    INNER JOIN images AS profileImage ON users._profileImageID = profileImage.imageID
                    INNER JOIN images AS thumbnailImage ON journeys._thumbnailID = thumbnailImage.imageID
                    INNER JOIN bookmarks ON journeys.journeyID = bookmarks._journeyID
                    GROUP BY journeys.journeyID
                    ORDER BY bookmarks DESC;');

        //return '"journeys":{ '.json_encode($result, JSON_PRETTY_PRINT)." \n}";
        return '{"journeys": '.json_encode($result, JSON_PRETTY_PRINT)." \n}";


    }
}

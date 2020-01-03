<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Bookmark as Bookmark;

class _BookmarkController extends BaseController
{
    public function selectCountBookmarksPerJourneyID($id){
        return DB::table('bookmarks')->where('_journeyID',$id)->count();
    }

    public function selectBookmarksPerUserID($userID){
        return DB::table('bookmarks')->where('_userID',$userID);
    }

    public function selectBookmarkIDPerUserIDAndJourneyID($userID, $journeyID){
        return DB::table('bookmarks')->where('_userID',$userID)->where('_journeyID',$journeyID)->value('bookmarkID');
    }

    public function insertOne(Request $request){
        $id = null;

        $requestArray = $request->all();
        $journeyID = $requestArray['_journeyID'];
        $userID = $requestArray['_userID'];

        $insertBookmarkArray = [
            '_userID' => $userID,
            '_journeyID' => $journeyID
        ];
        if($this->existsOne($journeyID,$userID)=="false"){
            $id = DB::table('bookmarks')->insertGetId($insertBookmarkArray);
        }
        $outputArray = [
            "bookmarkID" => $id,
            "_userID" => $userID,
            "_journeyID" => $journeyID
        ];
        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function deleteOne(Request $request){

        $requestArray = $request->all();
        $journeyID = $requestArray['_journeyID'];
        $userID = $requestArray['_userID'];

        $bookmarks= $this->selectBookmarkIDPerUserIDAndJourneyID($userID,$journeyID);
        $bookmark = Bookmark::find($bookmarks);
        if($this->existsOne($journeyID,$userID)=="true"){
            $bookmark->delete();
        }

        $outputArray = [
            "bookmarkID" => null,
            "_userID" => $userID,
            "_journeyID" => $journeyID
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function proveOne(Request $request){
        $requestArray = $request->all();
        $journeyID = $requestArray['_journeyID'];
        $userID = $requestArray['_userID'];

        $bookmarkID = $this->selectBookmarkIDPerUserIDAndJourneyID($userID,$journeyID);

        $outputArray = [
            "bookmarkID" => $bookmarkID,
            "_userID" => $userID,
            "_journeyID" => $journeyID
        ];
        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }


    public function existsOne($journeyID,$userID){
        $bookmark = Bookmark::where([['_journeyID', '=',$journeyID],['_userID', '=',$userID]]);
        return JSON_ENCODE($bookmark->exists());
    }

    public function showBookmarkedJourneys(Request $request){
        $journeyController = new _JourneyController;

        $requestArray = $request->all();
        $userID = $requestArray['userID'];
        $bookmarkedJourneys = json_decode(json_encode($this->selectBookmarksPerUserID($userID)->get()),true);
        $journeysArray = array();
        foreach($bookmarkedJourneys as $bookmarkedJourney){
            $journeyID = $bookmarkedJourney['_journeyID'];
            $journeyArray = json_decode($journeyController->selectOne($journeyID), true);
            array_push($journeysArray,$journeyArray);
        }

        return '{"journeys": '.json_encode($journeysArray,JSON_PRETTY_PRINT)." \n}";
    }


}

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
        $userController = new _UserController;
        $journeyController = new _JourneyController;
        $requestArray = $request->all();
        $journeyID = $requestArray['_journeyID'];
        $userID = $requestArray['_userID'];
        $insertBookmarkArray = [
            '_userID' => $requestArray['_userID'],
            '_journeyID' => $requestArray['_journeyID']
        ];
        if($this->existsOne($journeyID,$userID)=="false"){
            DB::table('bookmarks')->insert($insertBookmarkArray);
        }
        $outputArray = [
            "bookmark" => $this->existsOne($journeyID,$userID)
        ];
        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function deleteOne(Request $request){
        $requestArray = $request->all();
        $journeyID = $requestArray['_journeyID'];
        $userID = $requestArray['_userID'];
        $bookmarks= $this->selectBookmarkIDPerUserIDAndJourneyID($userID,$journeyID);
        $bookmarkID = Bookmark::find($bookmarks);
        if($this->existsOne($journeyID,$userID)=="true"){
            $bookmarkID->delete();
        }
        $outputArray = [
            "bookmark" => $this->existsOne($journeyID,$userID)
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function proveOne(Request $request){
        $requestArray = $request->all();
        $journeyID = $requestArray['_journeyID'];
        $userID = $requestArray['_userID'];
        $bookmarks= $this->selectBookmarkIDPerUserIDAndJourneyID($userID,$journeyID);
        $bookmarkID = Bookmark::find($bookmarks);
        $outputArray = [
            "bookmark" => $this->existsOne($journeyID,$userID)
        ];
        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }


    public function existsOne($journeyID,$userID){
        $bookmark = Bookmark::where([['_journeyID', '=',$journeyID],['_userID', '=',$userID]]);

        return JSON_ENCODE($bookmark->exists());
    }
}

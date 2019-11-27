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
        $insertBookmarkArray = [
            '_userID' => $requestArray['_userID'],
            '_journeyID' => $requestArray['_journeyID']
        ];
        return $this->existsOne($requestArray);
    }

    public function deleteOne(Request $request){
        $requestArray = $request->all();
        $journeyID = $requestArray['_journeyID'];
        $userID = $requestArray['_userID'];
        $bookmarks= $this->selectBookmarkIDPerUserIDAndJourneyID($userID,$journeyID);
        $bookmarkID = Bookmark::find($bookmarks);
        //return json_encode($bookmarks,JSON_PRETTY_PRINT);
        //var_dump($bookmarks);
        //print_r($bookmarks);
        $bookmarkID->delete();
        $outputArray = [
            "deleted" => true
        ];

        return json_encode($outputArray,JSON_PRETTY_PRINT);
    }

    public function existsOne($journeyID,$userID){
        $bookmark = Bookmark::where([['_journeyID', '=',$journeyID],['_userID', '=',$userID]]);

        return $bookmark->exists();
    }
}

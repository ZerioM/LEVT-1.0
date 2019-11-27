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

    public function insertOne(Request $request){

        $requestArray = $request->all();

        return $this->existsOne($requestArray);
    }

    public function existsOne($journeyID,$userID){
        $bookmark = Bookmark::where([['_journeyID', '=',$journeyID],['_userID', '=',$userID]]);

        return $bookmark->exists();;
    }
}

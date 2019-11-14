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
}

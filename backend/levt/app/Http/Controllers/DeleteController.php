<?php


namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers;
use Illuminate\Http\Request;

class DeleteController extends BaseController
{
    public function deleteOneJourney(Request $request){
        $jc = new _JourneyController;
        return $jc->deleteOne($request);
    }

    public function deleteOnePlace(Request $request){
        $pc = new _PlaceController;
        return $pc->deleteOne($request);
    }

    public function deleteOnePost(Request $request){
        $poc = new _PostController;
        return $poc->deleteOne($request);
    }

    public function deleteOneImage(Request $request){
        $ic = new _ImageController;
        return $ic->deleteOne($request);
    }

    public function deleteOneBookmark (Request $request){
        $bc = new _BookmarkController;
        return $bc->deleteOne($request);
    }
}

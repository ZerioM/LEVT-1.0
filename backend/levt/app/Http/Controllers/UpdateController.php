<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

class UpdateController extends BaseController
{
    public function updateOneJourney(Request $request){
        $jc = new _JourneyController;
        return $jc->updateOne($request);
    }

    public function updateOnePlace(Request $request){
        $pc = new _PlaceController;
        return $pc->updateOne($request);
    }

    public function updateOnePost(Request $request){
        $poc = new _PostController;
        return $poc->updateOne($request);
    }

    public function updateOneImage(Request $request){
        $ic = new _ImageController;
        return $ic->updateOne($request);
    }
}

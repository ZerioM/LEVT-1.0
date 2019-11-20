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
}

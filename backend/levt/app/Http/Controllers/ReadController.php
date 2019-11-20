<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers;
use Illuminate\Http\Request;


class ReadController extends BaseController
{

    //
    public function selectTopJourneys() {
        $jc = new _JourneyController;
        return $jc->selectAllLimit();
    }

    public function selectOneJourney(Request $request){
        $jc = new _JourneyController;
        return $jc->selectOne($request);
    }

    public function selectOnePlace(Request $request){
        $pc = new _PlaceController;
        return $pc->selectOne($request);
    }

    public function selectOnePost(Request $request){
        $poc = new _PostController;
        return $poc->selectOne($request);
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

    public function selectActivities(){
        $acc = new _ActivityController;
        return $acc->selectAll();
    }

    public function selectSeasons(){
        $sc = new _SeasonController;
        return $sc->selectAll();
    }
}

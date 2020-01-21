<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
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

    public function selectAllPlaces(Request $request) {
        $pc = new _PlaceController();
        return $pc->selectAll($request);
    }

    public function selectAllCountries(Request $request) {
        $cc = new _CountryController();
        return $cc->selectAllAsObject($request);
    }

    public function selectOneJourney(Request $request){
        $jc = new _JourneyController;
        $requestArray = $request->all();
        return $jc->selectOne($requestArray['journeyID']);
    }

    public function selectOneJourneyWithChildren(Request $request){
        $jc = new _JourneyController;
        $requestArray = $request->all();
        return $jc->selectOneWithChildren($requestArray['journeyID']);
    }

    public function selectOneJourneyByPlaceID(Request $request){
        $jc = new _JourneyController;
        return $jc->selectOneByPlaceID($request);
    }

    public function selectOnePlace(Request $request){
        $pc = new _PlaceController;
        $requestArray = $request->all();
        return $pc->selectOne($requestArray['placeID']);
    }

    public function selectOnePost(Request $request){
        $poc = new _PostController;
        $requestArray = $request->all();
        return $poc->selectOne($requestArray['postID']);
    }

    public function selectOneUser(Request $request){
        $uc = new _UserController;
        $requestArray = $request->all();
        return $uc->selectOne($requestArray['username']);
    }

    public function loginUser(Request $request){
        $uc = new _UserController;
        return $uc->login($request);
    }

    public function logoutUser(Request $request){
        $uc = new _UserController;
        return $uc->logout($request);
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

    public function showIfBookmarkExists(Request $request){
        $bc = new _BookmarkController;
        return $bc->proveOne($request);
    }

    public function selectBookmarkedJourneys(Request $request){
        $bc = new _BookmarkController;
        return $bc->showBookmarkedJourneys($request);
    }

    public function selectGenders(){
        $gc = new _GenderController;
        return $gc->selectAll();
    }

    public function validateOnePlace(Request $request){
        $pc = new _PlaceController;
        return $pc->validateOne($request);
    }

    public function autocompleteOnePlace(Request $request){
        $pc = new _PlaceController;
        return $pc->autocompleteOne($request);
    }

    public function journeysPerUser(Request $request){
        $jc = new _JourneyController;
        return $jc->selectAllJourneysPerUser($request);
    }

    public function journeysPerSearch(Request $request){
        $jc = new _JourneyController;
        return $jc->selectFilteredJourneys($request);
    }

    public function postsPerCoordinates(Request $request){
        $pc = new _PlaceController;
        $requestArray = $request->all();
        $leftX = $requestArray['leftX'];
        $leftY = $requestArray['leftY'];
        $rightX = $requestArray['rightX'];
        $rightY = $requestArray['rightY'];
        return $pc->selectBetweenCoordinates($leftX,$leftY,$rightX,$rightY);
    }

    public function checkUsername(Request $request){
        $uc = new _UserController;
        return $uc->checkIfExistsPerUsername($request);
    }

    public function checkEmail(Request $request){
        $uc = new _UserController;
        return $uc->checkIfExistsPerEmail($request);
    }

    public function emailVerified(Request $request){
        $uc =new _UserController;
        return $uc->emailVerified($request);
    }

    public function loadMessages(Request $request){
        $mc =new _MessageController;
        return $mc->loadMessages($request);
    }

    public function loadChatUsers(Request $request){
        $mc =new _MessageController;
        return $mc->loadChatUsers($request);
    }

}

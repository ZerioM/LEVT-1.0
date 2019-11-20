<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

class UpdateController extends BaseController
{
    public function updateOneJourney(Request $request){
        $jc = new _JourneyController;
        return $jc->updateOne($request);
    }
}

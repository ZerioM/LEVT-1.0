<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Controller;

use App\Models\Transport as Transport;

class _TransportController extends BaseController
{
    public function selectAll(){
        return '{"transports": '.json_encode(Transport::all(), JSON_PRETTY_PRINT)." \n}";
    }
}

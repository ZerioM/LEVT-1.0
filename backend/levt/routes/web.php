<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    // return $router->app->version();
    return view('picuploadTest');
});

//$router->get('/JSONData','JSONController@returnJSON');

//CREATE

$router->post('/newJourney','CreateController@insertJourney');

$router->post('/newPlace','CreateController@insertPlace');

$router->post('/newPost','CreateController@insertPost');

$router->post('/newImage','CreateController@insertImage');

$router->post('/newBookmark','CreateController@insertBookmark');

$router->post('/newUser','CreateController@insertUser');

//READ

$router->get('/top100','ReadController@selectTopJourneys');

$router->get('/allJourneyCategories','ReadController@selectJourneyCategories');

$router->get('/allCompanionships','ReadController@selectCompanionships');

$router->get('/allTransports','ReadController@selectTransports');

$router->get('/allActivities','ReadController@selectActivities');

$router->get('/allSeasons','ReadController@selectSeasons');

$router->get('/allGenders','ReadController@selectGenders');

$router->post('/oneJourney','ReadController@selectOneJourney');

$router->post('/onePlace','ReadController@selectOnePlace');

$router->post('/onePost','ReadController@selectOnePost');

$router->post('/proveBookmarkExists','ReadController@showIfBookmarkExists');

$router->post('/allBookmarkedJourneys','ReadController@selectBookmarkedJourneys');

$router->post('/oneUser','ReadController@selectOneUser');


//UPDATE

$router->post('/updateJourney','UpdateController@updateOneJourney');

$router->post('/updatePlace','UpdateController@updateOnePlace');

$router->post('/updatePost','UpdateController@updateOnePost');

$router->post('/updateImage','UpdateController@updateOneImage');



//DELETE

$router->post('/deleteJourney','DeleteController@deleteOneJourney');

$router->post('/deletePlace','DeleteController@deleteOnePlace');

$router->post('/deletePost','DeleteController@deleteOnePost');

$router->post('/deleteImage','DeleteController@deleteOneImage');

$router->post('/deleteBookmark','DeleteController@deleteOneBookmark');

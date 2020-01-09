<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return view('welcome');
});

Auth::routes(['verify' => true]);

Route::get('/home', 'HomeController@index')->name('home');


//CREATE

$router->post('/newJourney','CreateController@insertJourney');

$router->post('/newPlace','CreateController@insertPlace');

$router->post('/newPost','CreateController@insertPost');

$router->post('/newBookmark','CreateController@insertBookmark');

//$router->post('/newUser','CreateController@insertUser');

$router->post('/uploadImage','CreateController@uploadImage');

$router->post('/register','CreateController@register');


//READ

$router->get('/top100','ReadController@selectTopJourneys');

$router->get('/allJourneyCategories','ReadController@selectJourneyCategories');

$router->get('/allCompanionships','ReadController@selectCompanionships');

$router->get('/allTransports','ReadController@selectTransports');

$router->get('/allActivities','ReadController@selectActivities');

$router->get('/allSeasons','ReadController@selectSeasons');

$router->get('/allGenders','ReadController@selectGenders');

$router->get('/allPlaces','ReadController@selectAllPlaces');

$router->post('/oneJourney','ReadController@selectOneJourney');

$router->post('/oneJourneyWithChildren','ReadController@selectOneJourneyWithChildren');

$router->post('/oneJourneyByPlaceID','ReadController@selectOneJourneyByPlaceID');

$router->post('/onePlace','ReadController@selectOnePlace');

$router->post('/onePost','ReadController@selectOnePost');

$router->post('/proveBookmarkExists','ReadController@showIfBookmarkExists');

$router->post('/allBookmarkedJourneys','ReadController@selectBookmarkedJourneys');

$router->post('/oneUser','ReadController@selectOneUser');

$router->post('/validatePlace','ReadController@validateOnePlace');

$router->post('/autocompletePlace','ReadController@autocompleteOnePlace');

$router->post('/userJourneys','ReadController@journeysPerUser');

$router->post('/filteredPosts','ReadController@journeysPerSearch');

$router->post('/postsBetweenCoordinates','ReadController@postsPerCoordinates');



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

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

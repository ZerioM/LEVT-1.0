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


/*
| Bei allen Routen wo UserFunktion steht, muss der User am Anfang der Funktion überprüft werden:
| Code dafür:
|
$userController = new _UserController;

$validateUser = $userController->validateUser($request,$userID);
if($validateUser !== true){
    return $validateUser;
}
| userID muss vorher aus dem jeweiligen Kontext entnommen werden
|
*/


Route::get('/', function () {
    return view('welcome');
});

Route::get('/verified', function () {
    return view('emailVerified');
});

Route::get('/reset/password', function () {
    return view('passwordReset');
});

Auth::routes(['verify' => true]);

//Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


//CREATE

$router->post('/newJourney','CreateController@insertJourney'); //UserFunktion

$router->post('/newPlace','CreateController@insertPlace'); //UserFunktion

$router->post('/newPost','CreateController@insertPost'); //UserFunktion

$router->post('/newBookmark','CreateController@insertBookmark'); //UserFunktion

$router->post('/uploadImage','CreateController@uploadImage'); //UserFunktion //Muss noch am Handy getestet werden

$router->post('/registerUser','CreateController@insertUser');

$router->post('/sendEmailAgain','CreateController@sendEmail'); //UserFunktion?

$router->post('/forgotPassword','CreateController@forgotPassword');


//READ

$router->get('/top100','ReadController@selectTopJourneys');

$router->get('/allJourneyCategories','ReadController@selectJourneyCategories');

$router->get('/allCompanionships','ReadController@selectCompanionships');

$router->get('/allTransports','ReadController@selectTransports');

$router->get('/allActivities','ReadController@selectActivities');

$router->get('/allSeasons','ReadController@selectSeasons');

$router->get('/allGenders','ReadController@selectGenders');

$router->get('/allPlaces','ReadController@selectAllPlaces');

$router->get('/allCountries','ReadController@selectAllCountries');

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

$router->post('/loginUser','ReadController@loginUser');

$router->post('/logout','ReadController@logoutUser'); //UserFunktion

$router->post('/checkUsername','ReadController@checkUsername');

$router->post('/checkEmail','ReadController@checkEmail');

$router->post('/emailVerified','ReadController@emailVerified');



//UPDATE

$router->post('/updateJourney','UpdateController@updateOneJourney'); //UserFunktion

$router->post('/updatePlace','UpdateController@updateOnePlace'); //UserFunktion

$router->post('/updatePost','UpdateController@updateOnePost'); //UserFunktion

$router->post('/updateImage','UpdateController@updateOneImage'); //UserFunktion //Muss noch am Handy getestet werden

$router->post('/updateUser','UpdateController@updateOneUser'); //UserFunktion

$router->post('/password/change','UpdateController@updateOnePassword'); //UserFunktion //noch nicht erledigt




//DELETE

$router->post('/deleteJourney','DeleteController@deleteOneJourney'); //UserFunktion

$router->post('/deletePlace','DeleteController@deleteOnePlace'); //UserFunktion

$router->post('/deletePost','DeleteController@deleteOnePost'); //UserFunktion

$router->post('/deleteImage','DeleteController@deleteOneImage'); //UserFunktion //Muss noch am Handy getestet werden

$router->post('/deleteBookmark','DeleteController@deleteOneBookmark'); //UserFunktion

// Auth::routes();

// Route::get('/home', 'HomeController@index')->name('home');

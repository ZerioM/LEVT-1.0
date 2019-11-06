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
    return $router->app->version();
});

//$router->get('/JSONData','JSONController@returnJSON');

$router->get('/top100','ReadController@loadTopPosts');

$router->post('/newJourney','CreateController@insertJourney');

$router->post('/newPlace','CreateController@insertPlace');

$router->post('/newPost','CreateController@insertPost');

$router->post('/newImage','CreateController@insertImage');

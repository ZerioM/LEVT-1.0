<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    return [
        '_profileImageID' => $faker->numberBetween($min = 5, $max = 7),
        'username' => $faker->username,
        'pwHash' => '123',
        'emailAddress' => $faker->email,
        'birthday' => $faker->date,
        '_countryOfResidence' => 'AT',
        '_genderID' => $faker->numberBetween($min = 1, $max = 3),
        'firstname' => $faker->firstname,
        'lastname' => $faker->lastname,
    ];
});

$factory->define(App\Models\Journey::class, function (Faker\Generator $faker) {
    return [
        '_userID' => $faker->numberBetween($min = 1, $max = 50),
        '_thumbnailID' => $faker->numberBetween($min = 1, $max = 4),
        'journeyName' => $faker->country,
        '_seasonID' => $faker->numberBetween($min = 1, $max = 4),
        '_journeyCategoryID' => $faker->numberBetween($min = 1, $max = 10),
        '_companionshipID' => $faker->numberBetween($min = 1, $max = 6),
        'year' => $faker->numberBetween($min = 2010, $max = 2019),
        'detail' => $faker->text,
        'duration' => $faker->numberBetween($min = 1, $max = 50),
        'cost' => $faker->numberBetween($min = 10, $max = 10000),
    ];
});

$factory->define(App\Models\Bookmark::class, function (Faker\Generator $faker) {
    return [
        '_userID' => $faker->numberBetween($min = 1, $max = 50),
        '_journeyID' => $faker->numberBetween($min = 1, $max = 30),
    ];
});


$factory->define(App\Models\Place::class, function (Faker\Generator $faker) {
    return [
        '_journeyID' => $faker->numberBetween($min = 1, $max = 30),
        '_thumbnailID' => $faker->numberBetween($min = 1, $max = 4),
        '_countryID' => 'AT',
        'placeName' => $faker->city,
        'coordinateX' => $faker->longitude($min=-180, $max=180),
        'coordinateY' => $faker->latitude($min=-90, $max=90),
        'detail' => $faker->text
    ];
});

$factory->define(App\Models\Post::class, function (Faker\Generator $faker) {
    return [
        '_activityID' => $faker->numberBetween($min = 1, $max = 5),
        '_placeID' => $faker->numberBetween($min = 1, $max = 50),
        'detail' => $faker->text
    ];
});

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
        'username' => $faker->name,
        'pwHash' => '123',
    ];
});

$factory->define(App\Models\Journey::class, function (Faker\Generator $faker) {
    return [
        '_userID' => $faker->numberBetween($min = 1, $max = 50),
        '_thumbnailID' => $faker->numberBetween($min = 1, $max = 4),
        'journeyName' => $faker->name.' Journey',
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

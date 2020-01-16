<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            //ImagesTableSeeder::class,
            CountryTableSeeder::class,
            //UserTableSeeder::class,
            SeasonsTableSeeder::class,
            JourneyCategoriesTableSeeder::class,
            CompanionTableSeeder::class,
            //JourneyTableSeeder::class,
            //BookmarkTableSeeder::class,
            ActivityTableSeeder::class,
            TransportTableSeeder::class,
            //PlaceTableSeeder::class,
            //PostTableSeeder::class,
            //JourneyTransportTableSeeder::class
        ]);
    }
}

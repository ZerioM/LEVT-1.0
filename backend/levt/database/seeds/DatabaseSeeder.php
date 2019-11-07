<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call([
             ImagesTableSeeder::class,
             UserTableSeeder::class,
             SeasonsTableSeeder::class,
             JourneyCategoriesTableSeeder::class,
             CompanionTableSeeder::class,
             JourneyTableSeeder::class,
             BookmarkTableSeeder::class,
             ]);
    }
}

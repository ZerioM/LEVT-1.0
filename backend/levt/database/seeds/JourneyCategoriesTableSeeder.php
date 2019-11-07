<?php

use Illuminate\Database\Seeder;

class JourneyCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Hiking',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Beach',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Nature',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Culture',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Wintersport',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Summersport',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Sightseeing',
        ]);
    }
}

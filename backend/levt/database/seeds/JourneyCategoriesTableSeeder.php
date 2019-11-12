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
            'journeyCategoryName' => 'Cruise',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Culture',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Nature',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Camping',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Sports',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Roadtrip',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Interrail',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Beach Holiday',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Wellness',
        ]);
        DB::table('journeyCategories')->insert([
            'journeyCategoryName' => 'Party',
        ]);
    }
}

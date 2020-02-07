<?php

use Illuminate\Database\Seeder;

class SeasonsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('seasons')->insert([
            'seasonName' => 'Spring',
        ]);
        DB::table('seasons')->insert([
            'seasonName' => 'Summer',
        ]);
        DB::table('seasons')->insert([
            'seasonName' => 'Fall',
        ]);
        DB::table('seasons')->insert([
            'seasonName' => 'Winter',
        ]);

    }
}

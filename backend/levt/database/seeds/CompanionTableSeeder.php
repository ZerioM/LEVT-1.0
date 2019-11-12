<?php

use Illuminate\Database\Seeder;

class CompanionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('companionships')->insert([
            'companionshipType' => 'Alone',
        ]);
        DB::table('companionships')->insert([
            'companionshipType' => 'Friends (up to 4)',
        ]);
        DB::table('companionships')->insert([
            'companionshipType' => 'Friends (5 and more)',
        ]);
        DB::table('companionships')->insert([
            'companionshipType' => 'Partner',
        ]);
        DB::table('companionships')->insert([
            'companionshipType' => 'Family (up to 4)',
        ]);
        DB::table('companionships')->insert([
            'companionshipType' => 'Family (5 and more)',
        ]);
    }
}

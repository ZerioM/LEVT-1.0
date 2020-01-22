<?php

use Illuminate\Database\Seeder;

class BadgeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('badges')->insert([
            'badgeName' => 'Pioneer',
        ]);

        DB::table('badges')->insert([
            'badgeName' => 'Explorer',
        ]);
    }
}

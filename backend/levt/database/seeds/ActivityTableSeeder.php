<?php

use Illuminate\Database\Seeder;

class ActivityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('activities')->insert([
            'activityName' => 'Leisure',
        ]);
        DB::table('activities')->insert([
            'activityName' => 'Accommodation',
        ]);
        DB::table('activities')->insert([
            'activityName' => 'Meals and Drinks',
        ]);
        DB::table('activities')->insert([
            'activityName' => 'Transport',
        ]);
        DB::table('activities')->insert([
            'activityName' => 'Other',
        ]);

    }
}

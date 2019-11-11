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
            'activityName' => 'leisure',
        ]);
        DB::table('activities')->insert([
            'activityName' => 'accommodation',
        ]);
        DB::table('activities')->insert([
            'activityName' => 'mealsanddrinks',
        ]);
        DB::table('activities')->insert([
            'activityName' => 'transport',
        ]);
        DB::table('activities')->insert([
            'activityName' => 'other',
        ]);

    }
}

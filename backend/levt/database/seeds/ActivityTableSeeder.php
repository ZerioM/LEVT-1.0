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
            'journeyCategoryName' => 'accommodation',
        ]);
        DB::table('activities')->insert([
            'journeyCategoryName' => 'mealsanddrinks',
        ]);
        DB::table('activities')->insert([
            'journeyCategoryName' => 'transport',
        ]);
        DB::table('activities')->insert([
            'journeyCategoryName' => 'other',
        ]);

    }
}

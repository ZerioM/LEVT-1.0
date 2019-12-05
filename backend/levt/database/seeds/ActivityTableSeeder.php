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
            'iconName' => 'md-football'
        ]);
        DB::table('activities')->insert([
            'activityName' => 'Accommodation',
            'iconName' => 'md-bed'
        ]);
        DB::table('activities')->insert([
            'activityName' => 'Meals and Drinks',
            'iconName' => 'ios-restaurant'
        ]);
        DB::table('activities')->insert([
            'activityName' => 'Transport',
            'iconName' => 'md-airplane'
        ]);
        DB::table('activities')->insert([
            'activityName' => 'Other',
            'iconName' => 'ios-more'
        ]);

    }
}

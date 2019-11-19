<?php

use Illuminate\Database\Seeder;

class TransportTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('transports')->insert([
            'transportType' => 'Plane',
        ]);
        DB::table('transports')->insert([
            'transportType' => 'Car',
        ]);
        DB::table('transports')->insert([
            'transportType' => 'Bus',
        ]);
        DB::table('transports')->insert([
            'transportType' => 'Train',
        ]);
        DB::table('transports')->insert([
            'transportType' => 'Ship',
        ]);
        DB::table('transports')->insert([
            'transportType' => 'Motorbike',
        ]);
        DB::table('transports')->insert([
            'transportType' => 'Camping Trailer',
        ]);
        DB::table('transports')->insert([
            'transportType' => 'Hiking',
        ]);
        DB::table('transports')->insert([
            'transportType' => 'Bicycle',
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;

class PlaceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Place::class, 50)->create();
    }
}

<?php

use Illuminate\Database\Seeder;

class JourneyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Journey::class, 30)->create();
    }
}

<?php

use Illuminate\Database\Seeder;

class JourneyTransportTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\JourneyTransport::class, 30)->create();
    }
}

<?php

use Illuminate\Database\Seeder;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('images')->insert([
            'src' => '/assets/images/01.jpg',
        ]);

        DB::table('images')->insert([
            'src' => '/assets/images/04.jpg',
        ]);

        DB::table('images')->insert([
            'src' => '/assets/images/07.jpg',
        ]);

        DB::table('images')->insert([
            'src' => '/assets/images/09.jpg',
        ]);

        DB::table('images')->insert([
            'src' => '/assets/images/sandra2401.jpg',
        ]);

        DB::table('images')->insert([
            'src' => '/assets/images/sarah3110.jpg',
        ]);

        DB::table('images')->insert([
            'src' => '/assets/images/viegi2105.jpg',
        ]);
    }
}

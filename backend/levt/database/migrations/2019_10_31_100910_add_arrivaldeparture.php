<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddArrivaldeparture extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('journeys', function($table) {
            $table->date('arrivaldate')->nullable()->default(null);
            $table->date('departuredate')->nullable()->default(null);
        });

        Schema::table('images', function($table) {
            $table->bigInteger('_placeID')->unsigned()->nullable()->default(null)->change();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}

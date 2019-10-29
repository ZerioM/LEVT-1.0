<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('places', function (Blueprint $table) {
            $table->bigIncrements('placeID');
            $table->foreign('_journeyID')->references('journeyID')->on('journeys');
            $table->foreign('_thumbnailID')->references('imageID')->on('images');
            $table->foreign('_countryID')->references('countryID')->on('countries');
            $table->string('placeName');
            $table->decimal('coordinateX', 15, 10);
            $table->decimal('coordinateY', 15, 10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('places');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableMakeForeignKeysInJourneysPlacesUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('journeys', function (Blueprint $table) {
            $table->foreign('_thumbnailID')->references('imageID')->on('images')->onDelete('cascade');
        });
        Schema::table('places', function (Blueprint $table) {
            $table->foreign('_thumbnailID')->references('imageID')->on('images')->onDelete('cascade');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('_profileImageID')->references('imageID')->on('images')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('journeys_places_users', function (Blueprint $table) {
            //
        });
    }
}

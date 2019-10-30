<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //

        Schema::table('users', function($table) {
            $table->foreign('_profileImageID')->references('imageID')->on('images');
        });

        Schema::table('journeys', function($table) {
            $table->foreign('_userID')->references('userID')->on('users');
            $table->foreign('_thumbnailID')->references('imageID')->on('images');
        });

        Schema::table('places', function($table) {
            $table->foreign('_journeyID')->references('journeyID')->on('journeys');
            $table->foreign('_thumbnailID')->references('imageID')->on('images');
            $table->foreign('_countryID')->references('countryID')->on('countries');
        });

        Schema::table('images', function($table) {
            $table->foreign('_placeID')->references('placeID')->on('places');
        });

        Schema::table('bookmarks', function($table) {
            $table->foreign('_userID')->references('userID')->on('users');
            $table->foreign('_journeyID')->references('journeyID')->on('journeys');
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

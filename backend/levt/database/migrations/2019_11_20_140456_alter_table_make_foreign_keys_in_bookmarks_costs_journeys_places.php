<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableMakeForeignKeysInBookmarksCostsJourneysPlaces extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->foreign('_journeyID')->references('journeyID')->on('journeys')->onDelete('cascade');
        });
        Schema::table('costs', function (Blueprint $table) {
            $table->foreign('_journeyID')->references('journeyID')->on('journeys')->onDelete('cascade');
        });
        Schema::table('journeyTransports', function (Blueprint $table) {
            $table->foreign('_journeyID')->references('journeyID')->on('journeys')->onDelete('cascade');
        });
        Schema::table('places', function (Blueprint $table) {
            $table->foreign('_journeyID')->references('journeyID')->on('journeys')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('journeys', function (Blueprint $table) {
            //
        });
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableDeleteForeignKeysInJourneysPlacesUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('journeys', function (Blueprint $table) {
            $table->dropForeign('journeys__thumbnailid_foreign');
        });
        Schema::table('places', function (Blueprint $table) {
            $table->dropForeign('places__thumbnailid_foreign');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users__profileimageid_foreign');
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

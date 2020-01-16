<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableDeleteForeignKeysOnBookmarksCostsJourneytransportsPlace extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bookmarks', function (Blueprint $table) {
            $table->dropForeign('bookmarks__journeyid_foreign');
        });
        Schema::table('costs', function (Blueprint $table) {
            $table->dropForeign('costs__journeyid_foreign');
        });
        Schema::table('journeyTransports', function (Blueprint $table) {
            $table->dropForeign('journeytransports__journeyid_foreign');
        });
        Schema::table('places', function (Blueprint $table) {
            $table->dropForeign('places__journeyid_foreign');
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

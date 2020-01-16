<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableJourneysAndPlacesThumbnailNullableAndForeign extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('journeys', function($table) {
            $table->bigInteger('_thumbnailID')->unsigned()->nullable()->change();
            $table->foreign('_thumbnailID')->references('imageID')->on('images');
        });

        Schema::table('places', function($table) {
            $table->bigInteger('_thumbnailID')->unsigned()->nullable()->change();
            $table->foreign('_thumbnailID')->references('imageID')->on('images');
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

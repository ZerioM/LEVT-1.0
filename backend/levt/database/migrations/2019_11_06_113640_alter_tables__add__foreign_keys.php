<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTablesAddForeignKeys extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('costs', function($table) {
            //$table->foreign('_journeyID')->references('journeyID')->on('journeys');
            //$table->foreign('_activityID')->references('activityID')->on('activities');
        });

        Schema::table('posts', function($table) {
            //$table->foreign('_placeID')->references('placeID')->on('places');
            //$table->foreign('_activityID')->references('activityID')->on('activities');
        });

        Schema::table('journeys', function($table) {
            $table->foreign('_seasonID')->references('seasonID')->on('seasons');
            $table->foreign('_journeyCategoryID')->references('journeyCategoryID')->on('journeyCategories');
            $table->foreign('_companionshipID')->references('companionshipID')->on('companionships');
        });

        Schema::table('images', function($table) {
            $table->foreign('_postID')->references('postID')->on('posts');
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

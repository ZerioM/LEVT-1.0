<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTablesJourneysImages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('journeys', function($table) {
            $table->dropColumn('arrivaldate');
            $table->dropColumn('departuredate');
            $table->bigInteger('_seasonID')->unsigned();
            $table->bigInteger('_journeyCategoryID')->unsigned();
            $table->bigInteger('_companionshipID')->unsigned();
            $table->integer('year');
            $table->string('detail');
            $table->integer('duration');
            $table->decimal('cost');
        });

        Schema::table('images', function($table) {
            $table->dropColumn('post');
            $table->dropForeign('images__placeid_foreign');
            $table->dropColumn('_placeID');
            $table->bigInteger('_postID')->unsigned();
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

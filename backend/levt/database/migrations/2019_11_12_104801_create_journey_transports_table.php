<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJourneyTransportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('journeyTransports', function (Blueprint $table) {
            $table->bigInteger('_journeyID')->unsigned();
            $table->bigInteger('_transportID')->unsigned();
            $table->primary(['_journeyID', '_transportID']);
            $table->timestamp('updated');
            $table->timestamp('created')->default(DB::raw('CURRENT_TIMESTAMP'));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('journey_transports');
    }
}

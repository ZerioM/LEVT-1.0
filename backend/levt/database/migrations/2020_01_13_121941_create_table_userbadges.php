<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableUserbadges extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('userbadges', function (Blueprint $table) {
            $table->bigInteger('_badgeID')->unsigned();
            $table->bigInteger('_userID')->unsigned();
            $table->integer('progress');
            $table->timestamp('updated');
            $table->timestamp('created')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->primary(['_userID','_badgeID']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('userbadges');
    }
}

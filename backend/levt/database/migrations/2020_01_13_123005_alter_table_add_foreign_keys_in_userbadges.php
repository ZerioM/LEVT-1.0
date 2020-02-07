<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableAddForeignKeysInUserbadges extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('userbadges', function (Blueprint $table) {
            $table->foreign('_badgeID')->references('badgeID')->on('badges');
            $table->foreign('_userID')->references('userID')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('userbadges', function (Blueprint $table) {
            //
        });
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookmarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookmarks', function (Blueprint $table) {
            $table->bigIncrements('bookmarkID');
            $table->bigInteger('_userID')->unsigned();
            $table->bigInteger('_journeyID')->unsigned();
            //userID muss NULLable sein - Grischa fragen
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
        Schema::dropIfExists('likes');
    }
}

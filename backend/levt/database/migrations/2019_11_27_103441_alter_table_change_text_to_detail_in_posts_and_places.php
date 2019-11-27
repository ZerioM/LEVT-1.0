<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableChangeTextToDetailInPostsAndPlaces extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->renameColumn('text', 'detail');
        });

        Schema::table('places', function (Blueprint $table) {
            $table->renameColumn('text', 'detail');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('detail_in_posts_and_places', function (Blueprint $table) {
            //
        });
    }
}

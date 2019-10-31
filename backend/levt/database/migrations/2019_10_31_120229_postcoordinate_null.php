<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PostcoordinateNull extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('images', function($table) {
            $table->longText('post')->nullable()->default(null)->change();
            $table->decimal('coordinateX', 15, 10)->nullable()->default(null)->change();
            $table->decimal('coordinateY', 15, 10)->nullable()->default(null)->change();
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

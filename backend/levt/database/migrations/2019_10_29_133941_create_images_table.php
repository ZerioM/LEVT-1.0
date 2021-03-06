<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->bigIncrements('imageID');
            $table->bigInteger('_placeID')->unsigned();
            $table->string('src');
            $table->longText('post');
            $table->decimal('coordinateX', 15, 10);
            $table->decimal('coordinateY', 15, 10);
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
        Schema::dropIfExists('images');
    }
}

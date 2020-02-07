<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableJourneysAndPlacesDetailNullableDropForeignThumbnailid extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('journeys', function($table) {
            $table->text('detail')->nullable()->change();
            $table->dropForeign('journeys__thumbnailID_foreign');
        });

        Schema::table('places', function($table) {
            $table->dropForeign('places__thumbnailID_foreign');
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

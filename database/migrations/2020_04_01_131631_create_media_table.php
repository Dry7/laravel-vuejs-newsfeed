<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('feed_id');
            $table->string('link');
            $table->string('token');
            $table->string('source');
            $table->string('slug');
            $table->enum('type', ['image']);
            $table->string('url');
            $table->unsignedTinyInteger('width')->nullable();
            $table->unsignedTinyInteger('height')->nullable();
            $table->string('copyright')->nullable();
            $table->string('caption')->nullable();
            $table->string('credit')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('media');
    }
}

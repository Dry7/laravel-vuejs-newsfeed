<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFeedCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('feed_categories', function (Blueprint $table) {
            $table->primary(['feed_id', 'category_id']);
            $table->unsignedBigInteger('feed_id');
            $table->unsignedBigInteger('category_id');
            $table->boolean('primary')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('feed_categories');
    }
}

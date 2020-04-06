<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AlterFeedAddIndexes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('feed', function (Blueprint $table) {
            $table->index('title', 'ix__feed__title');
            DB::statement('CREATE INDEX ix__feed__content ON feed using gin(content)');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('feed', function (Blueprint $table) {
            $table->dropIndex('ix__feed__title');
            DB::statement('DROP INDEX ix__feed__content');
        });
    }
}

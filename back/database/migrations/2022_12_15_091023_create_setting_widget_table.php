<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('setting_widget', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('widget_id');
            $table->unsignedBigInteger('setting_id');
            $table->timestamps();

            $table->index('widget_id', 'widget_setting_widget_idx');
            $table->index('setting_id', 'widget_setting_setting_idx');

            $table->foreign('widget_id', 'widget_setting_widget_fk')->on('widgets')->references('id');
            $table->foreign('setting_id', 'widget_setting_setting_fk')->on('settings')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('widget_setting');
    }
};

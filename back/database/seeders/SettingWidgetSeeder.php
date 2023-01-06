<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingWidgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('setting_widget')->insert([
            'id' => 1,
            'widget_id' => 1,
            'setting_id' => 1
        ]);
        DB::table('setting_widget')->insert([
            'id' => 2,
            'widget_id' => 1,
            'setting_id' => 2
        ]);
        DB::table('setting_widget')->insert([
            'id' => 3,
            'widget_id' => 2,
            'setting_id' => 1
        ]);
        DB::table('setting_widget')->insert([
            'id' => 4,
            'widget_id' => 2,
            'setting_id' => 2
        ]);
        DB::table('setting_widget')->insert([
            'id' => 5,
            'widget_id' => 2,
            'setting_id' => 3
        ]);
    }
}

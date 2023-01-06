<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert([
            'id' => 1,
            'title' => 'Theme',
            'values' => 'Light, Dark',
            'currentValue' => 'Dark',
            'type' => 'switch'
        ]);
        DB::table('settings')->insert([
            'id' => 2,
            'title' => 'BorderColor',
            'values' => 'Accent, Blue, Transparent',
            'currentValue' => 'Accent',
            'type' => 'switch'
        ]);
        DB::table('settings')->insert([
            'id' => 3,
            'title' => 'Display',
            'values' => 'Rows, Grids',
            'currentValue' => 'Rows',
            'type' => 'switch'
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WidgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('widgets')->insert([
            'id' => 1,
            'order' => 1,
            'title' => 'Orders',
            'settingsIsOpen' => 0,
            'isActive' => 0,
            'widget' => '<GraphOrders />'
        ]);
        DB::table('widgets')->insert([
            'id' => 2,
            'order' => 2,
            'title' => 'Links',
            'settingsIsOpen' => 0,
            'isActive' => 0,
            'widget' => '<LinksWidget />'
        ]);
    }
}

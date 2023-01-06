<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shops')->insertOrIgnore([
            [
                'id' => 1,
                'name' => 'Gold aplle',
                'description' => 'Интернет-магазин профессиональной косметики и парфюмерии — «Золотое яблоко». ',
                'img' => 'goldappe.jpg',
                'link' => '#',
            ],
            [
                'id' => 2,
                'name' => 'Rendez-Vous',
                'description' => '100 розничных магазинов по всей России и интернет-магазин обуви, одежды и аксессуаров',
                'img' => 'randevy.jpg',
                'link' => '#',
            ],
            [
                'id' => 3,
                'name' => 'ГУМ',
                'description' => 'ГУМ – официальный интернет-магазин главного универмага страны',
                'img' => 'gum.jpg',
                'link' => '#',
            ],
            
        ]);
    }
}

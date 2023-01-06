<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('users')->insertOrIgnore([
            
            [
                'id' => '1',
                'name' => 'admin',
                'email' => 'admin@mail.ru',
                'widgets_places' => 'null',
                'password' => '$2a$12$8/YUbDIRGOpEqnUL8Q1IJ./pBLqfOjjEUqhef9lgFac8V.1xZciCW'
            ],
            [
                'id' => '2',
                'name' => 'kvisatz',
                'email' => 'kvisatz@mail.ru',
                'widgets_places' => 'null',
                'password' => '$2y$10$LD7kUgbQBbz4plVPXzsp2eT2WQxvlUZmd7bQ.ZLiik9f/6USdLpEi',
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MessageStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('message_status')->insertOrIgnore([
            [
                'id' => 1,
                'name' => 'Подготовка',
            ],
            [
                'id' => 2,
                'name' => 'В работе',
            ],
            [
                'id' => 3,
                'name' => 'Выполнено',
            ],
        ]);
    }
}

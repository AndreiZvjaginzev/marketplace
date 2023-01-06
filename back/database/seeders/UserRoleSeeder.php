<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::where("email", "kvisatz@mail.ru")->first();
        DB::table('user_role')->insertOrIgnore([
            [
                'id' => 1,
                'id_role' => 1,
                'id_user' => $user->id,
            ],
            
        ]);
    }
}

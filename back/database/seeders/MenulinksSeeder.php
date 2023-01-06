<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenulinksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('menu_links')->insertOrIgnore([
            [
                'id' => 1,
                'name' => 'Home',
                'route' => '/',
                'parent_id' => null,
            ],
            [
                'id' => 2,
                'name' => 'Network',
                'route' => null,
                'parent_id' => null,
            ],
            [
                'id' => 3,
                'name' => 'Activity',
                'route' => '/activity',
                'parent_id' => 2,
            ],
            [
                'id' => 4,
                'name' => 'Photos',
                'route' => '/photos',
                'parent_id' => 2,
            ],
            [
                'id' => 5,
                'name' => 'Products',
                'route' => null,
                'parent_id' => null,
            ],
            [
                'id' => 6,
                'name' => 'Jobs',
                'route' => null,
                'parent_id' => null,
            ],
            [
                'id' => 7,
                'name' => 'Classfields',
                'route' => null,
                'parent_id' => null,
            ],
            [
                'id' => 8,
                'name' => 'Register',
                'route' => '/registration',
                'parent_id' => null,
            ],
            [
                'id' => 9,
                'name' => 'Blog',
                'route' => null,
                'parent_id' => null,
            ],
            [
                'id' => 10,
                'name' => 'Contact',
                'route' => null,
                'parent_id' => null,
            ],
            [
                'id' => 11,
                'name' => 'Videos',
                'route' => '/videos',
                'parent_id' => 2,
            ],
            [
                'id' => 12,
                'name' => 'Members',
                'route' => '/members',
                'parent_id' => 2,
            ],
            [
                'id' => 13,
                'name' => 'Groups',
                'route' => '/groups',
                'parent_id' => 2,
            ],
            [
                'id' => 14,
                'name' => 'Forums',
                'route' => '/forums',
                'parent_id' => 2,
            ],
            [
                'id' => 15,
                'name' => 'All Products',
                'route' => '/all_products',
                'parent_id' => 5,
            ],
            [
                'id' => 16,
                'name' => 'Categories',
                'route' => '/categories',
                'parent_id' => 5,
            ],
            [
                'id' => 17,
                'name' => 'All Jobs',
                'route' => '/all_jobs',
                'parent_id' => 6,
            ],
            [
                'id' => 18,
                'name' => 'Job Categories',
                'route' => '/job_categories',
                'parent_id' => 6,
            ],
            [
                'id' => 19,
                'name' => 'Submit Job',
                'route' => '/submit_job',
                'parent_id' => 6,
            ],
            [
                'id' => 20,
                'name' => 'All Adverts',
                'route' => '/adverts',
                'parent_id' => 7,
            ],
            [
                'id' => 21,
                'name' => 'Advert Categories',
                'route' => '/ad_categories',
                'parent_id' => 7,
            ],
            [
                'id' => 22,
                'name' => 'Submit Advert',
                'route' => '/ad_submit',
                'parent_id' => 7,
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->firstname = 'Anna';
        $user->lastname = 'Lanz';
        $user->email = 'lanz1@live.de';
        $user->role = 'admin';
        $user->password = bcrypt('1234');
        $user->save();

        $user2 = new User();
        $user2->firstname = 'Maria';
        $user2->lastname = 'Huber';
        $user2->email = 'huber1@live.de';
        $user->role = 'admin';
        $user2->password = bcrypt('1234');
        $user2->save();

        $user3 = new User();
        $user3->firstname = 'Vernessa';
        $user3->lastname = 'Kaiser';
        $user3->email = 'kaiser1@live.de';
        $user->role = 'admin';
        $user3->password = bcrypt('1234');
        $user3->save();
    }
}

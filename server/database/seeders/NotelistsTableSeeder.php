<?php

namespace Database\Seeders;

use App\Models\Notelist;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;
use App\Models\Note;

class NotelistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notelist1 = new Notelist();

        $notelist1->title = 'Einkaufsliste';
        $notelist1->description = "Dinge die ich einkaufe";
        $notelist1->created_at = date("Y-m-d H:i:s");
        $notelist1->updated_at = date("Y-m-d H:i:s");
        $notelist1->is_public = 0;
        $notelist1->save();

        //add notelist to user
        $user1 = User::find('1');
        $user1->notelists()->save($notelist1);

        $notelist2 = new \App\Models\Notelist;
        $notelist2 ->title = 'Eine  Liste';
        $notelist2 ->description = 'Beschreibung Liste';
        $notelist2->save();

        //add notelist to user
        $user2 = User::find('2');
        $user2->notelists()->save($notelist2);

        $notelist3 = new \App\Models\Notelist;
        $notelist3 ->title = 'Shoppen';
        $notelist3 ->description = 'Gewand für Hochzeit';
        $notelist3->save();
    }
}

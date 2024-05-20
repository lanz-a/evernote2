<?php

namespace Database\Seeders;

use App\Models\Note;
use App\Models\Notetag;
use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;

class NotetagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $notetag1 = new Notetag();
        $notetag1->title = 'Einkaufen';
        $notetag1->save();

        $note1 = Note::find('1');
        $note1->notetags()->save($notetag1);

        $notetag2 = new Notetag();
        $notetag2->title = 'Merken';
        $notetag2->save();

        $notetag3 = new Notetag();
        $notetag3->title = 'wichtig';
        $notetag3->save();

        $todo3 = Todo::find('3');
        $todo3->notetags()->save($notetag3);
    }
}

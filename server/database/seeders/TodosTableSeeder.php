<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Note;
use App\Models\Notelist;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Todo;
use DateTime;
class TodosTableSeeder extends Seeder
{
    public function run(): void
    {
        $todo1 = new Todo();
        $todo1->title = 'Kochen';
        $todo1->description = 'Partyessen für 10 Personen kochen';
        $todo1->save();

        $user1 = User::find('1');
        $user1->todos()->save($todo1);

        $note1 = Note::find('1');
        $note1->todos()->save($todo1);

        $image1 = new Image();
        $image1->title = 'Cover 1';
        $image1->url = 'https://m.media-amazon.com/images/I/71pio-YV3XL._SY466_.jpg';
        $todo1->images()->save($image1);

        $todo2 = new Todo();
        $todo2->title = 'Umzug';
        $todo2->description = 'Kartons packen und in neue Wohnung umziehen';
        $todo2->save();

        $user2 = User::find('2');
        $user2->todos()->save($todo2);

        $note2 = Note::find('2');
        $note2->todos()->save($todo2);

        $todo3 = new Todo();
        $todo3->title = 'Weißeln';
        $todo3->description = 'Wände in der neuen Wohnung weißeln';
        $todo3->save();

        $user3 = User::find('3');
        $user3->todos()->save($todo3);


    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Image;
use App\Models\Notelist;
use App\Models\Note;
use App\Models\User;
use DateTime;

class NotesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $note1 = new Note();
        $note1->title = 'Gartenparty';
        $note1->description = 'Sachen für Gartenparty am 24.05. kaufen';
        $note1->save();

        // Associate note with notelist
        $notelist1 = Notelist::find('2');
        $notelist1->notes()->save($note1);
        // Associate note with image
        $image1 = new Image();
        $image1->title = 'Cover 1';
        $image1->url = 'https://m.media-amazon.com/images/I/71pio-YV3XL._SY466_.jpg';
        $image2 = new Image();
        $image2->title = 'Cover 2';
        $image2->url = 'https://m.media-amazon.com/images/I/51193ZLozAL._SY445_SX342_.jpg';
        $image3 = new Image();
        $image3->title = 'Cover 3';
        $image3->url = 'https://gastro-marktplatz.de/wp-content/uploads/2021/02/Vegane-Wurst.jpg';
        $note1->images()->saveMany([$image1, $image2, $image3]);

        $note2 = new Note();
        $note2->title = 'Küche ausräumen';
        $note2->description = 'Küche für Renovierung ausräumen.
            Alles in Kartons packen und in Garage stellen. Küche wird am 25.05. abgebaut';
        $note2->save();

        $notelist1 = Notelist::find('2');
        $notelist1->notes()->save($note2);
    }
}

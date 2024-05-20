<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\Note;
use App\Models\Notelist;
use App\Models\Notetag;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class NoteController extends Controller
{
    public function index(): JsonResponse
    {
        $notes = Note::with(['todos', 'notetags', 'images', 'users'])->get();
        return response()->json($notes, 200);
    }

    public function findById(string $id): JsonResponse
    {
        $notes = Note::where('id', $id)->with(['todos', 'notetags', 'images', 'users'])->get()->first();
        return $notes != null ? response()->json($notes, 200) : response()->json(null, 200);
    }

    public function checkIfIdExists(string $id): JsonResponse
    {
        $note = Note::where('id', $id)->first();
        return $note != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    public function save(Request $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $note = Note::create($request->all());
            // Save Image
            if (isset($request['images']) && is_array($request['images'])) {
                foreach ($request['images'] as $img) {
                    $image = Image::firstOrNew([
                        'url' => $img['url'],
                        'title' => $img['title']
                    ]);
                    $note->images()->save($image);
                }
            }

            // Save notetags
            if (isset($request['notetags']) && is_array($request['notetags'])) {
                foreach ($request['notetags'] as $tagData) {
                    $tagData = Tag::firstOrNew([
                        'title' => $tagData['title']
                    ]);
                    $note->notetags()->save($tagData);
                }
            }

            DB::commit();
            return response()->json($note, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving note failed: " . $e->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id): JsonResponse
    {
        DB::beginTransaction();
        try {
            $note = Note::with(['notetags', 'images'])
                ->where('id', $id)->first();
            if ($note != null) {
                $note->update($request->all());
                $note->images()->delete();
                if (isset($request['images']) && is_array($request['images'])) {
                    foreach ($request['images'] as $img) {
                        $image = Image::firstOrNew(['url' => $img['url'], 'title' => $img['title']]);
                        $note->images()->save($image);
                    }
                }
                $ids = [];
                if (isset($request['notetags']) && is_array($request['notetags'])) {
                    foreach ($request['notetags'] as $tag) {
                        array_push($ids, $tag['id']);
                    }
                }
                $note->notetags()->sync($ids);
                $note->save();
            }

            DB::commit();
            $updatedNote = Note::with(['notetags', 'images'])
                ->where('id', $id)->first();
            return response()->json($updatedNote, 201);
        } catch (\Exception $e) {
            // Rollback all queries
            DB::rollBack();
            return response()->json("updating note failed: " . $e->getMessage(), 420);
        }
    }

    public
    function delete(string $id): JsonResponse
    {
        $note = Note::where('id', $id)->first();
        if ($note != null) {
            $note->delete();
            return response()->json('note (' . $id . ') successfully deleted', 200);
        } else {
            return response()->json('note could not be deleted - it does not exist', 422);
        }
    }
}

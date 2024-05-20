<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\Note;
use App\Models\Notelist;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class TodoController extends Controller
{
    public function index(): JsonResponse {
        $todos = Todo::with(['notes', 'notetags', 'images', 'users'])->get();
        return response()->json($todos, 200);
    }

    public function findById(string $id): JsonResponse {
        $todo = Todo::where('id', $id)->with(['notes', 'notetags', 'images', 'users'])->get()->first();
        return $todo!=null ? response()->json($todo, 200) : response()->json(null, 200);
    }

    public function checkIfIdExists(string $id): JsonResponse {
        $todo = Todo::where('id', $id)->first();
        return $todo != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    public function save(Request $request): JsonResponse {
       // $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {
            $todo = Todo::create($request->all());
            if (isset($request['images']) && is_array($request['images'])) {
                foreach ($request['images'] as $img) {
                    $image = Image::firstOrNew([
                        'url' => $img['url'],
                        'title' => $img['title']
                    ]);
                    $todo->images()->save($image);
                }
            }

            // Save notetags
            if (isset($request['notetags']) && is_array($request['notetags'])) {
                foreach ($request['notetags'] as $tagData) {
                    $tagData = Tag::firstOrNew([
                        'title' => $tagData['title']
                    ]);
                    $todo->notetags()->save($tagData);
                }
            }

            DB::commit();
            return response()->json($todo, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving todo failed: " . $e->getMessage(), 420);
        }
    }

    public function update(Request $request, string $id) : JsonResponse {
        DB::beginTransaction();
        try {
            $todo = Todo::with(['notetags', 'images'])
                ->where('id', $id)->first();

            if ($todo != null) {
                $todo->update($request->all());
                $todo->images()->delete();
                if (isset($request['images']) && is_array($request['images'])) {
                    foreach ($request['images'] as $img) {
                        $image = Image::firstOrNew(['url' => $img['url'], 'title' => $img['title']]);
                        $todo->images()->save($image);
                    }
                }
                $ids = [];
                if (isset($request['notetags']) && is_array($request['notetags'])) {
                    foreach ($request['notetags'] as $tag) {
                        array_push($ids, $tag['id']);
                    }
                }
                $todo->notetags()->sync($ids);
                $todo->save();
            }

            DB::commit();
            $updatedTodo = Todo::with(['notetags', 'images'])
                ->where('id', $id)->first();
            return response()->json($updatedTodo, 201);
        } catch (\Exception $e) {
            // Rollback all queries
            DB::rollBack();
            return response()->json("updating todo failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(string $id) : JsonResponse {
        $todo = Todo::where('id', $id)->first();
        if ($todo != null) {
            $todo->delete();
            return response()->json('todo (' . $id . ') successfully deleted', 200);
        } else {
            return response()->json('todo could not be deleted - it does not exist', 422);
        }
    }
}

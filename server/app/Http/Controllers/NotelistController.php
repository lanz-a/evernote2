<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Models\Notelist;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;


class NotelistController extends Controller
{
    public function index(): JsonResponse {
        $notelists = Notelist::all();
        return response()->json($notelists, 200);
    }

    public function findById(string $id): JsonResponse {
        $notelist = Notelist::find($id);
        return $notelist !=null ? response()->json($notelist, 200): response()->json(null, 200);
    }

    public function checkIfIdExists(string $id): JsonResponse {
        $notelist = Notelist::where('id', $id)->first();
        return $notelist !=null ? response()->json(true, 200): response()->json(false, 200);
    }

    public function save(Request $request): JsonResponse {
       // $request = $this->parseRequest($request);

        DB::beginTransaction();
        try {
            $notelist = Notelist::create($request->all());

            // Save notes
            if (isset($request['notes']) && is_array($request['notes'])) {
                foreach ($request['notes'] as $noteData) {
                    $note = Note::firstOrNew([
                        'title' => $noteData['title'],
                        'description' => $noteData['description']
                    ]);
                    $notelist->notes()->save($note);
                }
            }

            DB::commit();
            return response()->json($notelist, 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json("saving notelist failed: " . $e->getMessage(), 420);
        }
    }

    //unused request date related
    private function parseRequest(Request $request): Request {
        if($request->has('published')) {
            $date = new \DateTime($request->published);
            $request['published'] = $date->format('Y-m-d H:i:s');
        }
        return $request;
    }

    public function update(Request $request, string $id) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $notelist = Notelist::with(['notes'])
                ->where('id', $id)->first();

            if ($notelist != null) {
               // $request = $this->parseRequest($request);
                $notelist->update($request->all());

                // Delete all old notes
                $notelist->notes()->delete();

                // Save new notes
                if (isset($request['notes']) && is_array($request['notes'])) {
                    foreach ($request['notes'] as $noteData) {
                        $note = Note::firstOrNew([
                            'title' => $noteData['title'],
                            'description' => $noteData['description']
                        ]);
                        $notelist->notes()->save($note);
                    }
                }

                $notelist->save();
            }

            DB::commit();
            $updatedNotelist = Notelist::with(['notes'])
                ->where('id', $id)->first();

            // Return a valid http response
            return response()->json($updatedNotelist, 201);
        } catch (\Exception $e) {
            // Rollback all queries
            DB::rollBack();
            return response()->json("updating notelist failed: " . $e->getMessage(), 420);
        }
    }

    public function delete(string $id) : JsonResponse {
        $notelist = Notelist::where('id', $id)->first();
        if ($notelist != null) {
            $notelist->delete();
            return response()->json('notelist (' . $id . ') successfully deleted', 200);
        }
        else
            return response()->json('notelist could not be deleted - it does not exist', 422);
    }
}

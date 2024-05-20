<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Notelist;

class UserController extends Controller
{
    public function index(): JsonResponse{
        $users = User::with(['firstname', 'lastname', 'email'])->get();
       return response()->json($users,200);
    }

    public function show() {
//        $notelists = Notelist::all();
//        return view('notelists.show',compact('notelists'));
    }
};

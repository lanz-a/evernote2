<?php

use App\Models\Notelist;
use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('/', [\App\Http\Controllers\NotelistController::class, "index"]);
Route::get('/notelists', [\App\Http\Controllers\NotelistController::class, "show"]);

Route::get('/notes', [NoteController::class, 'index']);


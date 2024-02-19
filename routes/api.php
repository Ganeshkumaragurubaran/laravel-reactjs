<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group([

    'middleware' => 'api',

], function ($router) {

    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);


    Route::get('/students',[StudentController::class,'index']);
    Route::post('/students/create',[StudentController::class,'create']);
    Route::post('/students/update/{id}',[StudentController::class,'update']);
    Route::get('/students/edit/{id}',[StudentController::class,'edit']);
    Route::delete('/students/delete/{id}',[StudentController::class,'destroy']);

});
Route::post('register',[AuthController::class,'register']);
Route::post('login', [AuthController::class,'login']);

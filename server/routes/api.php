<?php

use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\FollowerController;
use App\Http\Controllers\Api\GlobalController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/get-random-users' , [GlobalController::class , 'getRandomUsers']);
Route::get('/home' , [HomeController::class , 'index']);

Route::middleware(['auth:sanctum'])->group( function () {
    // USER
    Route::get('/logged-in-user', [UserController::class , 'loggedInUser']);
    Route::post('/update-user-image', [UserController::class , 'updateUserImage']);
    Route::patch('/update-user', [UserController::class , 'updateUser']);

    // POST
    Route::get('/posts/{id}', [PostController::class , 'show']);
    Route::post('/posts', [PostController::class , 'store']);
    Route::delete('/posts/{id}', [PostController::class , 'destroy']);

    // PROFILE
    Route::get('/profiles/{id}', [ProfileController::class , 'show']);

    // COMMENT
    Route::post('/comments' , [CommentController::class , 'store']);
    Route::delete('/comments/{id}' , [CommentController::class , 'destroy']);

    // LIKES
    Route::post('/likes' , [LikeController::class , 'store']);
    Route::delete('/likes/{id}' , [LikeController::class , 'destroy']);

    // FOLLOW
    Route::post('/follow' , [FollowerController::class , 'store']);
    Route::delete('/follow/{id}' , [FollowerController::class , 'destroy']);
}); 

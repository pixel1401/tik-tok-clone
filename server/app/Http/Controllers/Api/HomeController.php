<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AllPostsCollection;
use App\Models\Post;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {   
        try {
            $posts = Post::query()->orderBy('created_at' , 'desc')->get();

            return response()->json(['posts' => new AllPostsCollection($posts)]);
        } catch (\Exception $th) {
            return response()->json(['error'=> $th->getMessage()] , 400);
        }

    }

    
}

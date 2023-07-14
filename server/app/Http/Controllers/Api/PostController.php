<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Http\Resources\AllPostsCollection;
use App\Services\FileService;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['video' => "required|mimes:mp4",  'text' => 'required']);
        try {
            $post = new Post;
            $post = (new FileService)->addVideo($post, $request);
            $post->user_id = auth()->user()->id;
            $post->text = $request->input('text');

            $post->save();

            return response()->json(['post' => $post]);
        } catch (\Exception $th) {
            return response()->json(['error' => $th->getMessage()] , 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {   
        try {
            $post = Post::find($id);
            $posts = Post::where('user_id' , $post->user_id)->get();

            $ids = $posts->map(function ($post) {
                return $post->id;
            });

            return response()->json(['post' => new AllPostsCollection($post) , "ids"=> $ids]);
        } catch (\Exception $th) {
            return response()->json(['error' => $th->getMessage()] , 400);
        }
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $post = Post::findOrFail($id);
            if(!is_null($post->video) && file_exists(public_path() . $post->video) ) {
                unlink(public_path() . $post->video);
            }

            return response()->json(['success' => "ok"]);
        } catch (\Exception $th) {
            return response()->json(['error' => $th->getMessage() ] , 400);
        }
    }
}

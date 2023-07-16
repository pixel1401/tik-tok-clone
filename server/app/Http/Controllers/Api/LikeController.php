<?php

namespace App\Http\Controllers\Api;

use App\Models\Like;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LikeController extends Controller
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
        $request->validate(['post_id' => 'required']);
        try {
            $like = new Like;
            $like->user_id = auth()->user()->id;
            $like->post_id = $request->post_id;
            $like->save();

            return response()->json(['like' => ['id' => $like->id, 'user_id' => $like->user_id, 'post_id' => $like->post_id]]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    
    public function destroy(string $id)
    {
        try {
            $like = Like::query()->find($id);
            $like->delete();

            return response()->json(['like' => ['id' => $like->id, 'user_id' => $like->user_id, 'post_id' => $like->post_id]]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()] , 400);
            
        }
    }
}

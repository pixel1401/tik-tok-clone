<?php

namespace App\Http\Controllers\Api;

use App\Models\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['post_id' => 'required' , 'comment' => 'required']);
        try {
            $comment = new Comment;
            
            $comment->post_id = $request->input('post_id');
            $comment->user_id = auth()->user()->id;
            $comment->text = $request->input('comment');

            $comment->save();
            return response()->json(['success' => 'Ok']);
        } catch (\Throwable $th) {
            return response()->json(['error'=> $th->getMessage() , 400]);
        }
    }

  

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $comment = Comment::query()->find($id);
            $comment->delete();
            return response()->json(['success' => 'ok']);
        } catch (\Throwable $th) {
            return response()->json(['error' =>$th->getMessage()] , 400);
        }
    }
}

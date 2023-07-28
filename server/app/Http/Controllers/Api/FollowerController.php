<?php

namespace App\Http\Controllers\Api;

use App\Models\Follower;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    
    public function store(Request $request )
    {   
        $request->validate(['follow_id' => 'required']);
        try {
            $follow = new Follower;
            $follow->user_id = auth()->user()->id;
            $follow->follow_id = $request->follow_id;
            $follow->save();
            return response()->json(['follow' => $follow]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()] , 400);
        }
    }

    
    public function destroy($id)
    {
        try {
            $follow = Follower::find($id);
            $follow->delete();
            return response()->json(['follow' => $follow]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()] , 400);
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsersCollection;
use App\Models\User;
use Illuminate\Http\Request;

class GlobalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getRandomUsers()
    {   
        try {
            $suggested = User::inRandomOrder()->limit(5)->get();
            $following = User::inRandomOrder()->limit(10)->get();
            return response()->json(['success' => "OK" , "suggested"=> new UsersCollection($suggested) , "following" => new UsersCollection($following) ]);
        } catch (\Exception $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }

    
}

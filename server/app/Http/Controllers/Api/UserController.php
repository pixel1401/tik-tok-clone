<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UsersCollection;
use App\Models\User;
use App\Services\FileService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function loggedInUser()
    {
        try {
            $user = User::where('id' , auth()->user()->id)->get();
            return response()->json(new UsersCollection($user) , 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()] , 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function updateUserImage(Request $request)
    {
        $request->validate(['image' => 'required|mimes:png,jpg,jpeg']);
        if($request->height === '' || $request->width === '' || $request->top === '' || $request->left === '' ) {
            return response()->json(['error' => 'The dimension are incomplete'] , 400);
        }

        try {
            $user = (new FileService)->updateImage(auth()->user() , $request);
            $user->save();
            return response()->json(['success' => 'OK']);
        } catch (\Exception $th) {
            return response()->json(['error'=> $th->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function getUser($id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json(['success' => "OK" , 'user' => $user ]);
        } catch (\Exception $th) {
            return response()->json(['error'=> $th->getMessage()]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
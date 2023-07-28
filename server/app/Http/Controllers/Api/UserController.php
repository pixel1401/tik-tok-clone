<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AllPostsCollection;
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
            $user = User::findOrFail(auth()->user()->id);
            // dd($user);
            return response()->json(new UsersCollection([$user]) , 200);
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
            return response()->json(['success' => 'OK' , 'user'=> new UsersCollection([$user])]);
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
            $user = User::query()->findOrFail($id);
            return response()->json(['success' => "OK" , 'user' => $user ]);
        } catch (\Exception $th) {
            return response()->json(['error'=> $th->getMessage()]);
        }
    }



    /**
     * Update the specified resource in storage.
     */
    public function updateUser(Request $request)
    {
        $request->validate(["name" => "required"]);

        try {
            $user = User::query()->findOrFail(auth()->user()->id);
            $user->name = $request->input('name');
            $user->bio = $request->input('bio');
            $user->save();
            return response()->json(['success' => "OK" , 'user' => new UsersCollection([$user])]);
        } catch (\Exception $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

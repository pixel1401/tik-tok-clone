<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UsersCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
    //  * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map ( function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'bio' => $user->bio,
                'image' => url('/') . $user->image,
                'followers' => $user->followers->map(function ($follow) {
                    return [
                        'id'=> $follow->id,
                        'user_id'=> $follow->user_id,
                        'follow_id'=> $follow->follow_id,
                    ];
                }),
                'following' => $user->following->map(function ($follow) {
                    return [
                        'id'=> $follow->id,
                        'user_id'=> $follow->user_id,
                        'follow_id'=> $follow->follow_id,
                    ];
                }),
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ];
        } );
    }


    


}


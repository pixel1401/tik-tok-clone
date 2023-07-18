<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Http\Request;

class FileService {

    protected const PATH_IMAGES = "/files/images/";
    protected const PATH_VIDEOS = '/files/videos/';


    public function updateImage($model , Request $request )  {
        $image = Image::make($request->file('image'));

        if(!empty($model->image)) {
            $currentImage = public_path() . $model->image;

            if(file_exists($currentImage) && $currentImage != public_path() . '/user-placeholder.png') {
                unlink($currentImage);
            }
        }

        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();

        $image->crop(
            $request->width,
            $request->height,
            $request->left,
            $request->top,
        );

        $name = time() . '.' . $extension;
        $image->save(public_path() . self::PATH_IMAGES . $name);
        $model->image = self::PATH_IMAGES . $name;

        return $model;

    }


    public function addVideo (Model $model , Request $request) {
        $video = $request->file('video');
        $extension = $video->getClientOriginalExtension();
        $name = time() . '.' . $extension;
        $video->move(public_path() . self::PATH_VIDEOS , $name);
        $model->video = self::PATH_VIDEOS . $name;
        
        return $model;
    }

}
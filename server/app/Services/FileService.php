<?php

namespace App\Services;

use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Http\Request;

class FileService {
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
        $image->save(public_path() . '/files/images/' . $name);
        $model->image = '/files/images/' . $name;

        return $model;

    }

}
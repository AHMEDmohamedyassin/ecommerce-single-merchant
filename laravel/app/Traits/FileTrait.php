<?php

namespace App\Traits;
use Illuminate\Support\Facades\Storage;

Trait FileTrait {

    /**
     * resize and store images
     * @var req_name : the name of the request('request_name') ,
     * @var path : the path with file name but without file extenstion ,
     * @var size : images size in array [width , height]
     */
    public function StoreResizeImage ($image = null , $path , $size = [300 , 0]) {
        if(!$image) return;

        // create name for image
        $img_name = $path . '.jpg';

        $img_resized = new \Imagick($image->getPathname());

        $img_resized->resizeImage($size[0] , $size[1], \Imagick::FILTER_LANCZOS, 1);

        // store to storage
        $img = Storage::put($img_name, $img_resized->getImageBlob());

        $img_resized->destroy();

        return Storage::url($img_name);
    }

    /**
     * store files
     * @var file , @var path
     */
    public function StoreFile($file , $path){
        if(!$file) return ;

        $stored = Storage::put($path);

        return Storage::url($path);
    }


    /**
     * empty directory if path is directory path
     * @var path
     */
    public function DeleteFile($file_path){
        if(Storage::exists($file_path))
            return Storage::delete($file_path);
        return;
    }

    /**
     * empty directory if path is directory path
     * @var path
     */
    public function DeleteDir($path){
        if(Storage::exists($path))
            return Storage::deleteDirectory($path);
        return ;
    }

    /**
     * get file url
     * @var path
     */
    public function FileUrl ($path) {
        if(!Storage::exists($path)) return ;

        $url = Storage::url($path);

        return asset($url);
    }

    /**
     * count files in directory
     *
     */
    public function GetDirFiles ($path) {
        if(!Storage::exists($path)) return [];

        $files = Storage::allFiles($path);

        if($files){
            $url_files = [];
            foreach($files as $file)
                $url_files[] = $this->FileUrl($file);

            return $url_files;
        }
        return [];
    }

    /**
     * read file content
     */
    public function ReadContent ($path){
        if(!Storage::exists($path)) return ;

        $content = Storage::get($path);

        return $content;
    }
}

<?php
namespace App\Helper;

use Illuminate\Support\Facades\Storage;

trait Imageable{
    public function storeMedia($request, $name){
    $file = $request->file($name);

        $path_file = Storage::disk('public')->put("uploads" ,$file);

        $this->url = asset("storage/".$path_file);

        return $this;
    }
}
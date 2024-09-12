<?php

use Illuminate\Support\Facades\Route;

Route::get('/{path?}', function () {
    return view('Home');
})->where('path', '.*');


// Route::get('/storage-link' , function () {
//     $targetFolder = storage_path('app/public');
//     $linkFolder = $_SERVER['DOCUMENT_ROOT'] . '/public/storage';
//     symlink($targetFolder , $linkFolder);
// });

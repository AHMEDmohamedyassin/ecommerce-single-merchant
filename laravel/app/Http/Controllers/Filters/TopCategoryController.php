<?php

namespace App\Http\Controllers\Filters;

use App\Traits\ResponseTrait;
use App\Traits\PaginateTrait;
use App\Traits\SlugTrait;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class TopCategoryController{
    use ResponseTrait , PaginateTrait , SlugTrait;
    
}
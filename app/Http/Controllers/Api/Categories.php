<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Views\Categories\CategoryListView;
use App\Models\Category;

class Categories
{
    public function __invoke()
    {
        return new CategoryListView(Category::where('id', '>', 1)->orderBy('name')->get());
    }
}

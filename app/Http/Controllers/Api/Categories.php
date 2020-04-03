<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Views\Categories\CategoryListView;
use App\Repositories\CategoryRepository;

class Categories
{
    public function __invoke(CategoryRepository $repository)
    {
        return new CategoryListView($repository->all());
    }
}

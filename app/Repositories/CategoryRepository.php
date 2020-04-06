<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Http\Results\ItemsResult;
use App\Models\Category;

class CategoryRepository
{
    public function all()
    {
        $items = Category::selectRaw('categories.*, count(*) OVER () as total')
            ->orderBy('name')
            ->get();

        return new ItemsResult($items, (int) ($items->first()->total ?? 0));
    }
}

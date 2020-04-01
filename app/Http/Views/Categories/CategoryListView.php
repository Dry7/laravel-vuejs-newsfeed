<?php

declare(strict_types=1);

namespace App\Http\Views\Categories;

use App\Models\Category;
use App\Models\Feed;
use Illuminate\Database\Eloquent\Collection;

class CategoryListView implements \JsonSerializable
{
    private Collection $items;

    public function __construct(Collection $items)
    {
        $this->items = $items;
    }

    public function jsonSerialize(): array
    {
        return $this->items->map(static fn (Category $category) => new CategoryView($category))->toArray();
    }
}

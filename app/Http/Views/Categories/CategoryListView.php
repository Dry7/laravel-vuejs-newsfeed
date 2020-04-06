<?php

declare(strict_types=1);

namespace App\Http\Views\Categories;

use App\Http\Results\ItemsResult;
use App\Models\Category;

class CategoryListView implements \JsonSerializable
{
    private ItemsResult $result;

    public function __construct(ItemsResult $result)
    {
        $this->result = $result;
    }

    public function jsonSerialize(): array
    {
        return [
            'items' => $this->result
                ->getItems()
                ->map(static fn(Category $category) => new CategoryView($category))
                ->toArray(),
            'total' => $this->result->getTotal(),
        ];
    }
}

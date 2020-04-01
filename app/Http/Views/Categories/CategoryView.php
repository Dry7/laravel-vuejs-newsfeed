<?php

declare(strict_types=1);

namespace App\Http\Views\Categories;

use App\Models\Category;

class CategoryView implements \JsonSerializable
{
    private Category $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->category->id,
            'name' => $this->category->name,
        ];
    }
}

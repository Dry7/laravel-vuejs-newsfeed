<?php

declare(strict_types=1);

namespace App\Http\Results;

use Illuminate\Database\Eloquent\Collection;

class SearchResult
{
    private Collection $items;
    private int $total;

    public function __construct(Collection $items, int $total)
    {
        $this->items = $items;
        $this->total = $total;
    }

    public function getItems(): Collection
    {
        return $this->items;
    }

    public function getTotal(): int
    {
        return $this->total;
    }

    public function toArray(): array
    {
        return [
            'items' => $this->items,
            'total' => $this->total,
        ];
    }
}
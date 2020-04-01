<?php

declare(strict_types=1);

namespace App\Http\Views;

use App\Models\Feed;
use Illuminate\Database\Eloquent\Collection;

class FeedListView implements \JsonSerializable
{
    private Collection $items;

    public function __construct(Collection $items)
    {
        $this->items = $items;
    }

    public function jsonSerialize(): array
    {
        return $this->items->map(static fn (Feed $feed) => new FeedView($feed))->toArray();
    }
}

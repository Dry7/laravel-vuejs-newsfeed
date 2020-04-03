<?php

declare(strict_types=1);

namespace App\Http\Views\Feed;

use App\Http\Results\ItemsResult;
use App\Models\Feed;

class FeedListView implements \JsonSerializable
{
    private ItemsResult $result;

    public function __construct(ItemsResult $result)
    {
        $this->result = $result;
    }

    public function jsonSerialize(): array
    {
        return [
            'items' => $this->result->getItems()->map(static fn (Feed $feed) => new FeedView($feed))->toArray(),
            'total' => $this->result->getTotal(),
        ];
    }
}

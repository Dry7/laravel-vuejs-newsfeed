<?php

declare(strict_types=1);

namespace App\Http\Views\Feed;

use App\Http\Results\SearchResult;
use App\Models\Feed;
use Illuminate\Database\Eloquent\Collection;

class FeedListView implements \JsonSerializable
{
    private SearchResult $result;

    public function __construct(SearchResult $result)
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

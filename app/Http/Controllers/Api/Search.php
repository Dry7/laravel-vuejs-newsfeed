<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Views\Feed\FeedListView;
use App\Models\Feed;

class Search
{
    public function __invoke()
    {
        return new FeedListView(Feed::where('id', '>', 1)->get());
    }
}

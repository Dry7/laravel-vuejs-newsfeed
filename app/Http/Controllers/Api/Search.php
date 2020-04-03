<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Requests\SearchRequest;
use App\Http\Views\Feed\FeedListView;
use App\Repositories\FeedRepository;

class Search
{
    public function __invoke(SearchRequest $request, FeedRepository $repository): FeedListView
    {
        return new FeedListView($repository->search($request));
    }
}

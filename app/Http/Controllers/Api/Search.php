<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Requests\SearchRequest;
use App\Http\Views\Feed\FeedListView;
use App\Models\Feed;
use Illuminate\Database\Eloquent\Builder;

class Search
{
    public function __invoke(SearchRequest $request)
    {
        return new FeedListView(
            Feed::query()
                ->when(
                    $request->getCategory() > 0,
                    static fn (Builder $query) => $query->whereHas(
                        'categories',
                        static fn (Builder $query) => $query->where('id', $request->getCategory())
                    )
                )
                ->when(
                    !empty($request->getQuery()),
                    fn (Builder $query) => $query
                        ->where('title',  'ilike',  '%' . $this->escapeLike($request->getQuery()) . '%')
                )
                ->get()
        );
    }

    protected function escapeLike(string $query): string
    {
        return preg_replace('/%/', '\%', $query);
    }
}

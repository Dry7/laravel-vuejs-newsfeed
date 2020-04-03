<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Http\Requests\SearchRequest;
use App\Http\Results\ItemsResult;
use App\Models\Feed;
use Illuminate\Database\Eloquent\Builder;

class FeedRepository
{
    public function search(SearchRequest $request): ItemsResult
    {
        $items = Feed::query()
            ->selectRaw('feed.*, count(*) OVER () as total')
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
                    ->where('feed.title',  '~*',  $this->escapeLike($request->getQuery()))
            )
            ->offset($request->getOffset())
            ->limit($request->getLimit())
            ->get();

        return new ItemsResult($items, (int)($items->first()->total ?? 0));
    }

    protected function escapeLike(string $query): string
    {
        return preg_replace('/%/', '\%', $query);
    }
}

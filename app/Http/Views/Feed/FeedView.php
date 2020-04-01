<?php

declare(strict_types=1);

namespace App\Http\Views\Feed;

use App\Http\Views\MediaView;
use App\Models\Category;
use App\Models\Feed;
use App\Models\Media;
use Illuminate\Support\Collection;

class FeedView implements \JsonSerializable
{
    private Feed $feed;

    public function __construct(Feed $feed)
    {
        $this->feed = $feed;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->feed->id,
            'title' => $this->feed->title,
            'slug' => $this->feed->slug,
            'content' => $this->feed->content,
            'categories' => $this->categories(),
            'media' => $this->media(),
        ];
    }

    private function categories(): array
    {
        $categories = $this->feed->categories()->withPivot(['primary'])->get();
        $primary = $categories->where('pivot.primary', true)->first();

        return [
            'primary' => $primary ? $primary->name : null,
            'additional' => $categories
                ->where('pivot.primary', false)
                ->map(static fn (Category $category) => $category->name)
                ->values()
        ];
    }

    private function media(): Collection
    {
        return $this->feed->media->map(static fn (Media $media) => new MediaView($media))->values();
    }
}

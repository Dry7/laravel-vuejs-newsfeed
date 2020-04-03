<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\Feed;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class FeedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $feed = $this->loadFeed('feed.json');

        foreach ($feed as $news) {
            /** @var Feed $feed */
            $feed = Feed::firstOrCreate(
                ['slug' => $news->slug],
                [
                    'title' => html_entity_decode($news->title),
                    'content' => $news->content,
                    'created_at' => $news->properties->published,
                    'updated_at' => $news->properties->modified,
                ],
            );

            $this->importCategories($feed, $news->categories);
            $this->importMedia($feed, $news->media);
        }
    }

    private function loadFeed(string $fileName): array
    {
        return json_decode(file_get_contents(storage_path($fileName)));
    }

    private function importCategories(Feed $feed, object $categories): void
    {
        collect()
            ->when(
                $categories->primary !== null,
                static fn (Collection $collection) => $collection->add(
                    [$categories->primary, true],
                    ),
                )
            ->merge(array_map(
                static fn (string $category) => [$category, false],
                $categories->additional,
            ))
            ->map(static fn (array $item) =>
            [Category::query()->firstOrCreate(['name' => $item[0]])->id, $item[1]],
                )
            ->mapWithKeys(static fn (array $item) => [
                $item[0] => ['primary' => $item[1]]
            ])
            ->pipe(
                static fn (Collection $collection) => $feed->categories()->sync($collection)
            );
    }

    private function importMedia(Feed $feed, array $data): void
    {
        foreach ($data as $media) {
            $feed
                ->media()
                ->updateOrCreate(['token' => $media->media->id], [
                    'link' => $media->media->{'@link'},
                    'source' => $media->media->source,
                    'slug' => $media->media->slug,
                    'type' => $media->media->type,
                    'url' => $media->media->attributes->url,
                    'width' => $media->media->attributes->width,
                    'height' => $media->media->attributes->height,
                    'copyright' => (string)$media->media->attributes->copyright,
                    'caption' => (string)$media->media->attributes->caption,
                    'credit' => (string)$media->media->attributes->credit,
                    'created_at' => $media->media->properties->published,
                    'updated_at' => $media->media->properties->modified,
                ]);
        }
    }
}

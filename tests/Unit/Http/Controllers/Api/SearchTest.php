<?php

declare(strict_types=1);

namespace Tests\Unit\Http\Controllers\Api;

use App\Http\Controllers\Api\Categories;
use App\Http\Controllers\Api\Search;
use App\Http\Requests\SearchRequest;
use App\Http\Results\ItemsResult;
use App\Http\Views\Categories\CategoryListView;
use App\Http\Views\Feed\FeedListView;
use App\Models\Category;
use App\Models\Feed;
use App\Repositories\CategoryRepository;
use App\Repositories\FeedRepository;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class SearchTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @dataProvider invokeDataProvider
     *
     * @param array $items
     * @param string $expected
     */
    public function testInvoke(array $items, string $expected): void
    {
        // arrange
        $items = array_map(static function (array $data) {
            $feed = new Feed(array_intersect_key($data, ['title' => '', 'slug' => '', 'content' => '']));
            $feed->save();

            if (isset($data['categories']['primary'])) {
                $feed->categories()->create($data['categories']['primary'], ['primary' => true]);
            }

            $feed->categories()->createMany($data['categories']['additional'] ?? []);
            $feed->media()->createMany($data['media'] ?? []);

            return $feed;
        }, $items);
        /** @var SearchRequest $request */
        $request = $this->mock(SearchRequest::class);
        /** @var FeedRepository $mock */
        $mock = $this->mock(FeedRepository::class)
            ->shouldReceive('search')
            ->with($request)
            ->once()
            ->andReturn(new ItemsResult(collect($items), count($items)))
            ->getMock()
            ;

        // act
        /** @var FeedListView $response */
        $response = (new Search())($request, $mock);

        // assert
        self::assertInstanceOf(FeedListView::class, $response);
        self::assertEquals(json_encode($response->jsonSerialize()), $expected);
    }

    public static function invokeDataProvider(): array
    {
        return [
            'empty' => [
                'items' => [],
                'expected' => '{"items":[],"total":0}',
            ],
            'two items' => [
                'items' => [
                    ['title' => 'test', 'slug' => 'slug', 'content' => []],
                    ['title' => 'test2', 'slug' => 'slug2', 'content' => []],
                ],
                'expected' => '{"items":[{"id":1,"title":"test","slug":"slug","content":[],"categories":{"primary":null,"additional":[]},"media":[]},{"id":2,"title":"test2","slug":"slug2","content":[],"categories":{"primary":null,"additional":[]},"media":[]}],"total":2}',
            ],
            'item with content' => [
                'items' => [
                    ['title' => 'test', 'slug' => 'slug', 'content' => [['type' => 'html', 'content' => '<p>content<\/p>', 'attributes' => null]]],
                ],
                'expected' => '{"items":[{"id":1,"title":"test","slug":"slug","content":[{"type":"html","content":"<p>content<\\\\\\/p>","attributes":null}],"categories":{"primary":null,"additional":[]},"media":[]}],"total":1}',
            ],
            'item with additional categories' => [
                'items' => [
                    [
                        'title' => 'test',
                        'slug' => 'slug',
                        'content' => [['type' => 'html', 'content' => '<p>content<\/p>', 'attributes' => null]],
                        'categories' => [
                            'additional' => [
                                ['name' => 'category1'],
                                ['name' => 'category2'],
                            ],
                        ],
                    ],
                ],
                'expected' => '{"items":[{"id":1,"title":"test","slug":"slug","content":[{"type":"html","content":"<p>content<\\\\\\/p>","attributes":null}],"categories":{"primary":null,"additional":["category1","category2"]},"media":[]}],"total":1}',
            ],
            'item with primary category' => [
                'items' => [
                    [
                        'title' => 'test',
                        'slug' => 'slug',
                        'content' => [['type' => 'html', 'content' => '<p>content<\/p>', 'attributes' => null]],
                        'categories' => [
                            'primary' => ['name' => 'category1'],
                            'additional' => [
                                ['name' => 'category2'],
                                ['name' => 'category3'],
                            ],
                        ],
                    ],
                ],
                'expected' => '{"items":[{"id":1,"title":"test","slug":"slug","content":[{"type":"html","content":"<p>content<\\\\\\/p>","attributes":null}],"categories":{"primary":"category1","additional":["category2","category3"]},"media":[]}],"total":1}',
            ],
            'item with media' => [
                'items' => [
                    [
                        'title' => 'test',
                        'slug' => 'slug',
                        'content' => [],
                        'media' => [[
                            'link' => 'https://localhost/v2/media/copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-2-3',
                            'token' => '85b597bf-7472-5b72-99c8-d304f5d3a3e5',
                            'source' => 'archive',
                            'slug' => 'copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-2-3',
                            'type' => 'image',
                            'url' => 'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2019/12/Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-...-2-2.png',
                            'width' => 1200,
                            'height' => 628,
                            'copyright' => '',
                            'caption' => '',
                            'credit' => '',
                            'created_at' => '2019-12-17T12:30:41+00:00',
                            'updated_at' => '2019-12-17T12:30:41+00:00',
                        ]],
                    ],
                ],
                'expected' => '{"items":[{"id":1,"title":"test","slug":"slug","content":[],"categories":{"primary":null,"additional":[]},"media":[{"type":"featured","media":{"@link":"https:\/\/localhost\/v2\/media\/copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-2-3","id":"85b597bf-7472-5b72-99c8-d304f5d3a3e5","source":"archive","slug":"copy-of-copy-of-copy-of-copy-of-copy-of-copy-of-2-3","type":"image","attributes":{"url":"https:\/\/cdn0.tnwcdn.com\/wp-content\/blogs.dir\/1\/files\/2019\/12\/Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-Copy-of-...-2-2.png","width":1200,"height":628,"copyright":"","caption":"","credit":""},"properties":{"published":"2019-12-17T12:30:41+00:00","modified":"2019-12-17T12:30:41+00:00"}}}]}],"total":1}',
            ],
        ];
    }
}

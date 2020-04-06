<?php

declare(strict_types=1);

namespace Tests\Unit\Repositories;

use App\Http\Requests\SearchRequest;
use App\Models\Category;
use App\Models\Feed;
use App\Repositories\FeedRepository;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class FeedRepositoryTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @dataProvider totalDataProvider
     *
     * @param int $total
     * @param int $offset
     * @param int $limit
     * @param int $count
     */
    public function testTotal(int $total, int $offset, int $limit, int $count): void
    {
        // arrange
        $repository = new FeedRepository();

        factory(Feed::class, $total)->create();

        // act
        $response = $repository->search($this->mockRequest(0, null, $offset, $limit));

        // assert
        self::assertCount($count, $response->getItems());
        self::assertEquals($total, $response->getTotal());
    }

    public static function totalDataProvider(): array
    {
        return [
            'empty' => [
                'total' => 0,
                'offset' => 0,
                'limit' => 10,
                'count' => 0,
            ],
            'first 10 of 100' => [
                'total' => 100,
                'offset' => 0,
                'limit' => 10,
                'count' => 10,
            ],
            'second 10 of 30' => [
                'total' => 30,
                'offset' => 10,
                'limit' => 10,
                'count' => 10,
            ],
            'second 5 of 35' => [
                'total' => 35,
                'offset' => 30,
                'limit' => 10,
                'count' => 5,
            ],
            'all 12' => [
                'total' => 12,
                'offset' => 0,
                'limit' => 12,
                'count' => 12,
            ],
        ];
    }

    public function testSearchByCategory(): void
    {
        // arrange
        $category = factory(Category::class)->create(['id' => 1]);

        factory(Feed::class, 10)
            ->create()
            ->take(3)
            ->each(static fn(Feed $feed) => $feed->categories()->save($category));

        $repository = new FeedRepository();

        // act
        $response = $repository->search($this->mockRequest(1, null));

        // assert
        self::assertCount(3, $response->getItems());
    }

    public function testSearchByQuery(): void
    {
        // arrange
        factory(Feed::class)->create(['title' => 'Cosmology in crisis as evidence suggests']);
        factory(Feed::class)->create([
            'title' => 'A tech apocalypse is inevitable without the humanities',
        ]);

        $repository = new FeedRepository();

        // act
        $response = $repository->search($this->mockRequest(0, 'crisis'));

        // assert
        self::assertCount(1, $response->getItems());
    }

    public function testSearchByQueryInContent(): void
    {
        // arrange
        factory(Feed::class)->create([
            'title' => 'Test',
            'content' => [
                ['type' => 'html', 'content' => 'Text with crisis', 'attributes' => null],
            ],
        ]);
        factory(Feed::class)->create([
            'title' => 'Test',
            'content' => [['type' => 'html', 'content' => 'test', 'attributes' => null]],
        ]);

        $repository = new FeedRepository();

        // act
        $response = $repository->search($this->mockRequest(0, 'crisis'));

        // assert
        self::assertCount(1, $response->getItems());
    }

    public function testDetails(): void
    {
        // arrange
        $feed = factory(Feed::class)->create([
            'slug' => 'why-researchers-should-make-sure-robots-dont-become-weapons',
        ]);
        $repository = new FeedRepository();

        // act
        $response = $repository->details(
            'why-researchers-should-make-sure-robots-dont-become-weapons'
        );

        // assert
        self::assertEquals($feed->id, $response->id);
    }

    private function mockRequest(
        int $category = 0,
        ?string $query = null,
        int $offset = 0,
        int $limit = 10
    ): SearchRequest {
        /** @var SearchRequest $mock */
        $mock = $this->mock(SearchRequest::class)
            ->shouldReceive('getCategory')
            ->andReturn($category)
            ->getMock()
            ->shouldReceive('getQuery')
            ->andReturn($query)
            ->getMock()
            ->shouldReceive('getOffset')
            ->andReturn($offset)
            ->getMock()
            ->shouldReceive('getLimit')
            ->andReturn($limit)
            ->getMock();

        return $mock;
    }
}

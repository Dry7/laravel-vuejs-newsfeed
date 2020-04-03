<?php

declare(strict_types=1);

namespace Tests\Unit\Http\Controllers\Api;

use App\Http\Controllers\Api\Details;
use App\Http\Views\Categories\CategoryListView;
use App\Http\Views\Feed\FeedView;
use App\Models\Feed;
use App\Repositories\FeedRepository;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class DetailsTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @dataProvider invokeDataProvider
     *
     * @param array $content
     * @param string $expected
     */
    public function testInvoke(array $content, string $expected): void
    {
        // arrange
        $feed = factory(Feed::class)->create(['title' => 'title', 'slug' => 'slug', 'content' => $content]);
        /** @var FeedRepository $mock */
        $mock = $this->mock(FeedRepository::class)
            ->shouldReceive('details')
            ->with('slug')
            ->andReturn($feed)
            ->getMock()
            ;

        // act
        /** @var CategoryListView $response */
        $response = (new Details())('slug', $mock);

        // assert
        self::assertInstanceOf(FeedView::class, $response);
        self::assertEquals(json_encode($response->jsonSerialize()), $expected);
    }

    public static function invokeDataProvider(): array
    {
        return [
            'without content' => [
                'content' => [],
                'expected' => '{"id":1,"title":"title","slug":"slug","content":[],"categories":{"primary":null,"additional":[]},"media":[]}',
            ],
            'with content' => [
                'content' => [['type' => 'html', 'content' => '<p>content<\/p>', 'attributes' => null]],
                'expected' => '{"id":1,"title":"title","slug":"slug","content":[{"type":"html","content":"<p>content<\\\\\\/p>","attributes":null}],"categories":{"primary":null,"additional":[]},"media":[]}',
            ],
        ];
    }
}

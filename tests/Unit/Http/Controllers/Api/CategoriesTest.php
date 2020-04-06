<?php

declare(strict_types=1);

namespace Tests\Unit\Http\Controllers\Api;

use App\Http\Controllers\Api\Categories;
use App\Http\Results\ItemsResult;
use App\Http\Views\Categories\CategoryListView;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Tests\TestCase;

class CategoriesTest extends TestCase
{
    /**
     * @dataProvider invokeDataProvider
     *
     * @param array $items
     * @param string $expected
     */
    public function testInvoke(array $items, string $expected): void
    {
        // arrange
        /** @var CategoryRepository $mock */
        $mock = $this->mock(CategoryRepository::class)
            ->shouldReceive('all')
            ->andReturn(new ItemsResult(collect($items), count($items)))
            ->getMock();

        // act
        /** @var CategoryListView $response */
        $response = (new Categories())($mock);

        // assert
        self::assertInstanceOf(CategoryListView::class, $response);
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
                    new Category(['name' => 'test']),
                    new Category(['name' => 'test2']),
                ],
                'expected' =>
                    '{"items":[{"id":null,"name":"test"},{"id":null,"name":"test2"}],"total":2}',
            ],
        ];
    }
}

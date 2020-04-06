<?php

declare(strict_types=1);

namespace Tests\Unit\Repositories;

use App\Http\Results\ItemsResult;
use App\Models\Category;
use App\Repositories\CategoryRepository;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class CategoryRepositoryTest extends TestCase
{
    use DatabaseMigrations;

    /**
     * @dataProvider allDataProvider
     *
     * @param array $categories
     */
    public function testAll(array $categories): void
    {
        foreach ($categories as $category) {
            factory(Category::class)->create(['name' => $category]);
        }

        $repository = new CategoryRepository();

        $response = $repository->all();

        self::assertInstanceOf(ItemsResult::class, $response);
        self::assertEquals(count($categories), $response->getTotal());
        self::assertSame(
            $categories,
            $response
                ->getItems()
                ->pluck('name')
                ->sort()
                ->toArray()
        );
    }

    public static function allDataProvider(): array
    {
        return [
            'empty' => [
                'categories' => [],
            ],
            'once category' => [
                'categories' => ['test'],
            ],
            'few categories' => [
                'categories' => ['1one', '2two', '3three'],
            ],
        ];
    }
}

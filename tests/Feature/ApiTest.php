<?php

declare(strict_types=1);

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use DatabaseMigrations;

    public function testCategories(): void
    {
        factory(Category::class, 20)->create();

        $this->post('/api/v1/categories')
            ->assertOk()
            ->assertJsonCount(20, 'items')
            ->assertJsonPath('total', 20);
    }

    public function testSearch(): void
    {
        $this->postJson('/api/v1/search', [])
            ->assertOk()
            ->assertJson([
                'items' => [],
                'total' => 0,
            ]);
    }

    public function testSearchWithInvalidRequest(): void
    {
        $this->postJson('/api/v1/search', [
            'category' => 'wrong',
        ])->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}

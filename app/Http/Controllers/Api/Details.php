<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Views\Feed\FeedView;
use App\Repositories\FeedRepository;

class Details
{
    public function __invoke(string $slug, FeedRepository $repository): FeedView
    {
        return new FeedView($repository->details($slug));
    }
}

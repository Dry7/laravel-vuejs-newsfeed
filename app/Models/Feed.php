<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

/**
 * Class Feed
 *
 * @package App\Models
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property object $content
 *
 * @property-read Category[]|Collection $categories
 * @property-read Media[]|Collection $media
 */
class Feed extends Model
{
    protected $table = 'feed';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id',
    ];

    /**
     * @var array
     */
    protected $casts = [
        'content' => 'object',
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'feed_categories');
    }

    public function media(): HasMany
    {
        return $this->hasMany(Media::class);
    }
}

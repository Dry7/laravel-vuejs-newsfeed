<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Class Category
 *
 * @package App\Models
 *
 * @property int $id
 * @property string $name
 *
 * @property-read Feed[] $feeds
 */
class Category extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    public function feeds(): BelongsToMany
    {
        return $this->belongsToMany(Feed::class, 'feed_categories');
    }
}

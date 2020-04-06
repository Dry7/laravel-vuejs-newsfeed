<?php

declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Media
 *
 * @package App\Models
 *
 * @property int $id
 * @property int $feed_id
 * @property string $link
 * @property string $token
 * @property string $source
 * @property string $slug
 * @property string $type
 * @property string $url
 * @property int $width
 * @property int $height
 * @property string $copyright
 * @property string $caption
 * @property string $credit
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Media extends Model
{
    protected $table = 'media';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id'];
}

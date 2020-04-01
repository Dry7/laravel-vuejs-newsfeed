<?php

declare(strict_types=1);

namespace App\Http\Views;

use App\Models\Media;

class MediaView implements \JsonSerializable
{
    private Media $media;

    public function __construct(Media $media)
    {
        $this->media = $media;
    }

    public function jsonSerialize(): array
    {
        return [
            'type' => 'featured',
            'media' => [
                '@link' => $this->media->link,
                'id' => $this->media->token,
                'source' => $this->media->source,
                'slug' => $this->media->slug,
                'type' => $this->media->type,
                'attributes' => [
                    'url' => $this->media->url,
                    'width' => $this->media->width,
                    'height' => $this->media->height,
                    'copyright' => $this->media->copyright,
                    'caption' => $this->media->caption,
                    'credit' => $this->media->credit,
                ],
                'properties' => [
                    'published' => $this->media->created_at->toIso8601String(),
                    'modified' => $this->media->updated_at->toIso8601String(),
                ]
            ]
        ];
    }
}

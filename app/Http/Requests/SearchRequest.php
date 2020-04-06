<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    private const DEFAULT_LIMIT = 10;

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category' => 'nullable|integer',
            'query' => 'nullable|string',
            'offset' => 'nullable|integer',
            'limit' => 'nullable|integer',
        ];
    }

    public function getCategory(): int
    {
        return (int) $this->input('category');
    }

    public function getQuery(): ?string
    {
        return $this->input('query');
    }

    public function getOffset(): int
    {
        return (int) $this->input('offset');
    }

    public function getLimit(): int
    {
        return (int) $this->input('limit', self::DEFAULT_LIMIT);
    }
}

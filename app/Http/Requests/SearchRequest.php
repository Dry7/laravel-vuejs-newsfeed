<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category' => 'integer',
            'query' => 'string',
        ];
    }

    public function getCategory(): int
    {
        return (int)$this->input('category');
    }

    public function getQuery(): ?string
    {
        return $this->input('query');
    }
}

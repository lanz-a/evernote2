<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'url', 'title'
   ];

// 1 Image in many Notes/todos
    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }

    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class);
    }
}


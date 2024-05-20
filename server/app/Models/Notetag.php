<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Notetag extends Model
{
    use HasFactory;

    protected $fillable = [
        'title'
    ];

    public function notes(): BelongsToMany
    {
        return $this->belongsToMany(Note::class);
    }

    public function todos(): BelongsToMany
    {
        return $this->belongsToMany(Todo::class);
    }

}

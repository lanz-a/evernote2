<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'notetag', 'doneDate', 'is_public', 'assigned', 'image'
    ];

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function notetags(): BelongsToMany
    {
        return $this->belongsToMany(Notetag::class);
    }

    public function notes(): BelongsTo
    {
        return $this->belongsTo(Note::class);
    }

    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Image::class);
    }
}

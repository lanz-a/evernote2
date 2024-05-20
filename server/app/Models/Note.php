<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'notetag',
        'created'
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function images(): BelongsToMany
    {
        return $this->belongsToMany(Image::class);
    }

    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class);
    }

    public function notetags(): BelongsToMany
    {
        return $this->belongsToMany(Notetag::class);
    }

    public function notelists(): BelongsTo
    {
        return $this->belongsTo(Notelist::class);
    }
}

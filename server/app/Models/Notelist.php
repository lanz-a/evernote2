<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Notelist extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'tag', 'is_public', 'owner'];

    public function isPublic(): bool
    {
        return $this->is_public <= 0;
    }

    public static function isPublic2(): bool
    {
        return static::where('is_public', '<=', 0)->get();
    }

    public function scopeIsPublic($query)
    {
        return $query->where('is_public', '<=', 0);
    }

    /**
     * notelist has many notes
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }

}

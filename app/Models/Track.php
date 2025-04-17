<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Track extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'length',
        'description',
        'difficulty',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

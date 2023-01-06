<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Appeal;

class Message extends Model
{
    use HasFactory;

    protected $table = 'messages';

    public function childMsg()
    {
        return $this->hasMany(Message::class, 'parent_id');
    }

    public function appeal()
    {
        return $this->belongsTo(Appeal::class);
    }
}

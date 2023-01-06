<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\MessageStatus;

class Appeal extends Model
{
    use HasFactory;
    
    protected $table = 'appeals';

    public function status()
    {
        return $this->hasOne(MessageStatus::class, 'id' ,'status_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}

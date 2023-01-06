<?php

namespace App\Models;

use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $table = 'user_role_name';

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_role', 'id_role', 'id_user');
    }
}

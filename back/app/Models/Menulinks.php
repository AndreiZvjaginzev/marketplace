<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menulinks extends Model
{
    use HasFactory;

    protected $table = 'menu_links';

    public function sublinks()
    {
        return $this->hasMany(Menulinks::class);
    }
}

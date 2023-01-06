<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Widget;

class Setting extends Model
{
    use HasFactory;

    protected $table = 'settings';

    public function widgets() {
        return $this->belongsToMany(Widget::class, 'setting_widget', 'setting_id', 'Widget_id');
    }
}

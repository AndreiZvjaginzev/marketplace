<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Setting;

class Widget extends Model
{
    use HasFactory;

    protected $table = 'widgets';

    public function settings() {
        return $this->belongsToMany(Setting::class, 'setting_widget', 'widget_id', 'setting_id');
    }
}

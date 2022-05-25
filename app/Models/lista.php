<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class lista extends Model
{
    use HasFactory;
    public function producto() {
        return $this->belongsTo("productos","producto");
    }
    public function user() {
        return $this->belongsTo("users","user","id");
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\subdepartamento;
class productos extends Model
{
    use HasFactory;
    public function subdepartamento(){
        return $this->belongsTo(subdepartamento::class,'subdepartamento','id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \App\Models\departamento;
use \App\Models\productos;

class subdepartamento extends Model
{
    use HasFactory;
    public function departamentos() {
        return $this->belongsTo(departamento::class,'department','id');
    }
    public function productos() {
        return $this->hasMany(productos::class, 'subdepartamento');
    }
    public static function getAllDepartments(){
        return departamento::query()->select("departamentos.id","departamentos.nombre")->join("subdepartamentos","departamentos.id","=","subdepartamentos.departamento")->distinct()->get();
    }
}

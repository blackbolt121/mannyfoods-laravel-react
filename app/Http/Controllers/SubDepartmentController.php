<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\subdepartamento;

class SubDepartmentController extends Controller
{
    function getSubdepartments(int $dept){
        return subdepartamento::query()->select("id","nombre")->where("departamento","=",$dept)->get();;
    }
}

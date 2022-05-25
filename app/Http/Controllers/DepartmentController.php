<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\subdepartamento;
use \App\Models\departamento;

class DepartmentController extends Controller
{
    function getDepartments() {
        return subdepartamento::getAllDepartments();
    }
}

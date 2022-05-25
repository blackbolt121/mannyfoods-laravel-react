<?php

namespace App\Http\Controllers;

use App\Models\productos;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    function getProductBySubdepartment(int $subdepartamento){
        return productos::query()->select("id","nombre")->where("subdepartamento",$subdepartamento)->get();
    }
}

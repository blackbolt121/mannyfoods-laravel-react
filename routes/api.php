<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post("/login", [\App\Http\Controllers\UserController::class,'login']);
Route::post("/register", [\App\Http\Controllers\UserController::class,'createUser']);
Route::get("/departments", [\App\Http\Controllers\DepartmentController::class,'getDepartments']);
Route::get("/subdepartements/{id}",[\App\Http\Controllers\SubDepartmentController::class,'getSubdepartments']);
Route::get("/products/subdepartment/{id}",[\App\Http\Controllers\ProductController::class,'getProductBySubdepartment']);
Route::post("/lista/add",[\App\Http\Controllers\ListaController::class,"addProduct"]);
Route::get("/lista/{user}",[\App\Http\Controllers\ListaController::class,"getLista"]);
Route::delete("/lista/remove",[\App\Http\Controllers\ListaController::class,"removeListItem"]);
Route::post("/inventario/add",[\App\Http\Controllers\ListaController::class,"addInventory"]);
Route::get("/inventario/{user}",[\App\Http\Controllers\InventoryController::class,"getInventory"]);
Route::put("/inventario",[\App\Http\Controllers\InventoryController::class,"removeInventory"]);

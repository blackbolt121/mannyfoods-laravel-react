<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Inventario;
use \App\Models\lista;
class InventoryController extends Controller
{
    //
    function getInventory(int $user) {
        return \App\Models\Inventario::query()->select("inventarios.id","productos.nombre","inventarios.cantidad","inventarios.min")->join("productos","productos.id","=","inventarios.producto")->where("user",$user)->get()->all();
    }
    function removeInventory(Request $request){
        $user = $request->input("user");
        $cantidad = $request->input("cantidad");
        $producto = $request->input("producto");
        if(filter_var($user, FILTER_VALIDATE_INT) && filter_var($cantidad,FILTER_VALIDATE_INT) && filter_var($producto,FILTER_VALIDATE_INT)){
            $inv = Inventario::query()->where("id",$producto)->where("user",$user)->get();
            if( $inv->count() == 0 ){
                return response("",400);
            }
            $inventory = $inv->first();
            $cantidad1 = $inventory->cantidad - $cantidad;
            if($cantidad1 <= 0) {
                //Se elimina del inventario y se agrega a compras

                $lista = new lista;
                $lista->user = $user;
                $lista->producto = $inventory->producto;
                $lista->cantidad = $inventory->min;
                $lista->save();
                $inventory->delete();
                return response("",200);
            }
            $inventory->cantidad = $cantidad1;
            $inventory->save();
            return response("Usuario: $user Registro: $producto Cantidad: $cantidad Resultados:{$inv}");
        }
        return response("$user $producto $cantidad");
    }
}

<?php

namespace App\Http\Controllers;

use http\Message;
use Illuminate\Http\Request;
use \App\Models\lista;

class ListaController extends Controller
{
    //
    function getLista(int $user){
        return lista::query()
            ->select("listas.id","productos.nombre", "listas.cantidad", "productos.precio")
            ->join("productos","productos.id","=","listas.producto")
            ->where("user",$user)
            ->get()
            ->all();
    }
    function addProduct(Request $request){
        try{
            $user            = intval($request->input("user"));
            $producto        = intval($request->input("producto"));
            $cantidad        = intval($request->input("cantidad"));

            if(lista::all()->where("producto",$producto)->where("user",$user)->count() > 0){
                $list = lista::all()->where("producto",$producto)->where("user",$user)->first();
                $list->cantidad = $list->cantidad + $cantidad;
                $list->save();
            }else{
                $list = new lista();
                $list->user = $user;
                $list->producto = $producto;
                $list->cantidad = $cantidad;
                $list->save();
            }
        }catch (\Error $error){
            return response()->json([$error->getMessage(),$error->getLine()]);
        }
        return response([],200);
    }
    public function removeListItem(Request $request){
        $user = $request->input("user");
        $id   = $request->input("producto");
        if(!filter_var($user,FILTER_VALIDATE_INT)){
            return response()->json([$request->getContent(), $id],400);
        }
        $item = \App\Models\lista::query()
            ->where("id",$id);
        if(!($item->count() > 0)){
            return response()->json(["No such product"], 400);
        }
        $item->first()->delete();
        return response()->json(["status"=>"ok"]);
    }

    public function addInventory(Request $request){
        $product = $request->input("producto");
        $user   = $request->input("user");
        if(!(filter_var($product, FILTER_VALIDATE_INT) && filter_var($user, FILTER_VALIDATE_INT))){
            return response("bad product, or bad user",400);
        }
        $list = \App\Models\lista::query()->where("id", $product)->where("user",$user);
        if($list->count() == 0){
            return response("No such product in list $product for $user",400);
        }
        try{

            $list_element = $list->first();
            $inventory = \App\Models\Inventario::query()
                ->where("user", $user)
                ->where("producto",$list_element->producto);
            echo $inventory->count();
            if($inventory->count() > 0){
                $inv = $inventory->first();
                $inv->cantidad = $inv->cantidad + $list_element->cantidad;
                $list_element->delete();
                $inv->save();
                return response("",200);
            }

            $inventory = new \App\Models\Inventario;
            $inventory->user = $user;
            $inventory->producto = $list_element->producto;
            $inventory->min = $list_element->cantidad;
            $inventory->cantidad = $list_element->cantidad;
            $inventory->save();
            $list_element->delete();

        }catch(\Exception $e){
            return response("{$e->getMessage()}\n{$e->getLine()}", 400);
        }
        return response("",200);
    }

}

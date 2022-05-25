<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //
    public function createUser(Request $request){
        $data = json_decode($request->getContent());
        $errors = [];
        $this->hasSet($errors, "nombre", $data->name);
        $this->hasSet($errors, "email", $data->email);
        $this->hasSet($errors, "direccion", $data->direccion);
        $this->hasSet($errors,"age", $data->age);
        $this->hasSet($errors, "password", $data->password);
        $this->hasSet($errors,"cpassword", $data->cpassword);
        if( sizeof($errors) > 0 ){
            return response()->json($errors,402);
        }
        if( strlen($data->name)  <= 0 ){
            array_push($errors,"Wrong name");
        }
        if(!filter_var($data->email, FILTER_VALIDATE_EMAIL)){
            array_push($errors,"Wrong email");
        }
        if( strlen($data->direccion) <= 0 ){
            echo strlen($data->direccion) == 0;
            array_push($errors,"Wrong direccion");
        }
        if(!filter_var($data->age, FILTER_VALIDATE_INT)){
            array_push($errors, "La edad debe ser un entero");
        }else{
            //En caso de que la edad si sea numerica
            if($data->age < 0 || $data->age > 99){
                array_push($errors, "Edad no valida");
            }
        }
        if(strlen($data->password) == 0 || strlen($data->cpassword) == 0 || strcmp($data->password,$data->cpassword) != 0){
            array_push($errors, "password doesnt match");
        }
        if( sizeof($errors) > 0 ) {
            return response()->json($errors,402);
        }

        $person = new \App\Models\User;
        $person->name = $data->name;
        $person->age = $data->age;
        $person->email = $data->email;
        $person->direccion = $data->direccion;
        $person->password = bcrypt($data->password);
        $person->save();
    }

    public function login(Request $request){
        $data = json_decode($request->getContent());
        try{
            $user = \App\Models\User::query()->where("email",$data->email)->get()->first();
            if(Hash::check($data->password, $user->password)){
                return response()->json(["token"=>$user->createToken($data->email)->plainTextToken, "user"=>$user->id, "email"=>$user->email]);
            }else{
                return response()->json([],400);
            }
        }catch (\Exception $exception){
            return response()->json([$request->email],402);
        }
    }

    public function hasValue(&$var){
        return isset($var) == null;
    }
    public function hasSet(&$errors, string $name, &$var){
        if($this->hasValue($var)){
            array_push($errors, "missing $name");
        }
    }
}

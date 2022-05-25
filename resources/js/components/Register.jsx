import {React, Component } from "react";
import Nav from "./NavBar";
import "../styles/Register.css"
import { Navigate } from "react-router-dom";
export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nombre: "",
            correo: "",
            direccion: "",
            direccion2: "",
            contraseña: "",
            ccontraseña: "",
            edad:0,
            invalido: "",
            redirect: ""
        }
        this.border = "1px soid red"
        this.none_border = "none"
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleUpdate(event) {
        const name = event.target.name
        const value = event.target.value;
        switch (name) {
            case "nombre":
                this.setState({"nombre":value})
                this.nombreEsValido()
                break;
            case "correo":
                this.setState({"correo":value})
                this.correoEsValido2()
                break;
            case "edad":
                this.setState({"edad":value});
                break;
            case "direccion":
                this.setState({ "direccion": value })
                this.direccionEsValida()
                break;
            case "direccion2":
                this.setState({ "direccion2": value })
                this.direccionEsValida()
                break;
            case "contraseña":
                this.setState({ "contraseña": value });
                break;
            case "ccontraseña":
                this.setState({ "ccontraseña": value })
                break;
            default:
                break;
        }
    }
    handleClick() {
        this.setState({invalido:""})
        let boolean = true;
        boolean &= this.nombreEsValido();
        boolean &= this.direccionEsValida();
        boolean &= this.correoEsValido();
        boolean &= this.passwordEsValido();
        if(boolean){
            this.setState({invalido:""})
            fetch("/api/register",{
                method: "POST",
                headers:{
                    "Accept":"*/*",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    "email":`${this.state.correo}`,
                    "password":`${this.state.contraseña}`,
                    "cpassword": `${this.state.ccontraseña}`,
                    "age": this.state.edad,
                    "name":`${this.state.nombre}`,
                    "direccion":`${(this.state.direccion + " " + this.state.direccion2).trim()}`
                })
            }).then(response => {
                if(response.status === 200 && response.ok){
                    this.setState({"redirect":<><Navigate to="/login"/></>})
                }else if(response.status === 400){
                    this.setState({"invalido":"Lo siento, el correo ingresado ya ha sido utilizado"})
                }
            }).catch(exception => {
                this.setState({"invalido":"Error, no se puede contactar con los servidores"})
            })
        }else{
            this.setState({invalido:"Porfavor, revise los campos seleccionados"})
        }

    }
    passwordEsValido(){
        let contraseña = this.state.contraseña, ccontraseña = this.state.ccontraseña
        if((contraseña === ccontraseña) && contraseña.length > 0){
            document.getElementById("contraseña").style.border = "none";
            document.getElementById("ccontraseña").style.border = "none";
            return true;
        }else{
            document.getElementById("contraseña").style.border = "1px solid red";
            document.getElementById("ccontraseña").style.border = "1px solid red";
        }
        return false;
    }
    direccionEsValida(){
        let direccion = this.state.direccion, direccion2 = this.state.direccion2
        let field_1 = document.getElementById("direccion"), field_2 = document.getElementById("direccion2")
        if(direccion.length > 0 || direccion2.length > 0) {
            field_1.style.border = "none";
            field_2.style.border = "none";
            return true;
        }else{
            field_1.style.border = "1px solid red";
            field_2.style.border = "1px solid red";
            return false;
        }

    }
    nombreEsValido(){
        let nombre = this.state.nombre
        if( nombre !== ""){
            document.getElementById("nombre").style.border = "none";
            return true;
        }else{
            document.getElementById("nombre").style.border = "1px solid red";
            return false;
        }
    }
    correoEsValido2(){
        let correo = this.state.correo
        if (correo.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/)){
            document.getElementById("correo").style.border = "none";
            return true;
        }else{
            document.getElementById("correo").style.border = "1px solid red";
            return false;
        }
    }
    correoEsValido(){
        let correo = this.state.correo
        if (correo.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            document.getElementById("correo").style.border = "none";
            return true;
        }else{
            document.getElementById("correo").style.border = "1px solid red";
            return false;
        }
    }
    edadEsValida(){

    }
    render() {
        return (
            <>
                {localStorage.getItem("token") != undefined? <Navigate to={"/dashboard"}/> : null}
                {this.state.redirect}
                <Nav />
                <div className="container__register">
                    <label htmlFor="nombre">Nombre</label>
                    <input value={this.state.nombre} type="text" name="nombre" id="nombre" onChange={this.handleUpdate} />
                    <label htmlFor="edad">Edad</label>
                    <input type="number" min={0} max={100} name="edad" id="edad" onChange={this.handleUpdate} value={this.state.age}/>
                    <label htmlFor="correo">Correo</label>
                    <input value={this.state.correo} type="email" name="correo" id="correo" onChange={this.handleUpdate} />
                    <label htmlFor="direccion">Direccion</label>
                    <input type="text" name="direccion" id="direccion" onChange={this.handleUpdate} />
                    <label htmlFor="direccion2">Direccion 2</label>
                    <input type="text" name="direccion2" id="direccion2" onChange={this.handleUpdate} on/>
                    <label htmlFor="contraseña">Contraseña</label>
                    <input type="password" name="contraseña" id="contraseña" onChange={this.handleUpdate} />
                    <label htmlFor="ccontraseña">Confirmar Contraseña</label>
                    <input type="password" name="ccontraseña" id="ccontraseña" onChange={this.handleUpdate} />
                    <p>{this.state.invalido}</p>
                    <input type="submit" value="Registrarse" className="button" onClick={this.handleClick} />
                </div>
            </>
        );
    }
}

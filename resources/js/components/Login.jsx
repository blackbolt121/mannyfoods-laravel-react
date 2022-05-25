import { Component } from "react";
import Nav from "./NavBar";
import "../styles/Login.css"
import { Navigate } from "react-router-dom";
export default class Login extends Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            action: "/",
            status: "",
            redirect:""
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({status:""})
        let email = document.getElementById("email").value
        let password = document.getElementById("password").value
        let bod = {
            "email": email,
            "password": password
        }
        if(true){
            let login = async () => {
                fetch("api/login", {
                    method: "post",
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'accept': '*/*'
                    },
                    body: JSON.stringify(bod)
                }).then(response => {
                    if (response.ok && response.status === 200) {
                        return response.json();
                    }else if(response.status === 400 || response.status == 402)
                        throw Error("Las credenciales proporcionadas no son validas")
                    else {
                        throw Error("Ooops, tenemos problemas con nuestros servidores")
                    }
                }).then(
                    response => {
                        window.localStorage.setItem("token",response.token);
                        localStorage.setItem("user",response.user);
                        localStorage.setItem("email",response.email);
                        this.setState({redirect:<><Navigate to="/dashboard"/></>})
                    }
                ).catch(error => {
                    this.setState({ "status": error.message })
                })
            }
            login();
        }
    }
    render() {

        return (
             <>
                 {localStorage.getItem("token") != undefined? <Navigate to={"/dashboard"}/> : null}
                <Nav routes={{"Home":"/","Acerca":"/acerca","Registrar":"/register"}}/>
                <div>
                    {this.state.redirect}
                    <div id="login" className="container__login">
                        <img src="https://www.kindpng.com/picc/m/192-1925162_login-icon-png-transparent-png.png" alt="" />
                        <p>{this.state.status}</p>
                        <label htmlFor="email">Email</label>
                        <input name="email" id="email" type="email" placeholder="email@example.com"/>
                        <label htmlFor="password">Password</label>
                        <input name="password" id="password" type="password" placeholder="tu password"/>
                        <input type="submit" value="Login" className="button" onClick={this.handleSubmit}/>
                    </div>

                </div>
             </>

        );
    }
}

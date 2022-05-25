
import React, { Fragment } from "react";
import Nav from "./NavBar";
import { useState } from "react";
import {useParams} from "react-router-dom";
import NotFound from "./dashboard/NotFound"
import Lista from "./dashboard/Lista";
import Compras from "./dashboard/Compras";
import Inventario from "./dashboard/Inventario";
const Dashboard = ()=>{
    let [redirect, setRedirect] = useState();
    let {action} = useParams();
    let content = <></>
    if(localStorage.getItem("token") == null){

    }
    switch (action){
        case "lista":
            content = <Lista/>
            break;
        case "compras":
            content = <Compras/>
            break;
        case undefined:
        case "inventario":
            content = <Inventario/>;
            break;
        default:
            content = <NotFound/>
            break;
    }
    return <Fragment>
        {redirect}
        <Nav
            imgRoute={"/dashboard"}
            routes={{
            "Inventario": "/dashboard/inventario",
            "Lista": "/dashboard/lista",
            "Compras":"/dashboard/compras",
            "Cerrar Sesión":"/logout"
        }}/>
        {content}
    </Fragment>
}
export default Dashboard;

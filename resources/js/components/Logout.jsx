import {Navigate} from "react-router-dom";
const Logout = () =>{
    if(confirm("¿Estas seguro de cerrar sesión?")){
        localStorage.clear();
        return <Navigate to={"/"}/>
    }else{
        return <Navigate to={"/dashboard"}/>
    }
}
export default Logout;

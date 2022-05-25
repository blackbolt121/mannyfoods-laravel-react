import {uniqueId} from "lodash/util";

const ListaItem = (props) => {
    const prevDefault = (e) => {
        e.preventDefault()
    }
    const del = () => {
        let url = `/api/lista/remove`
        let producto = document.getElementById(prod_id).value
        let user = localStorage.getItem("user")
        fetch(url, {
            method: "delete",
            "Content-Type": "form-data",
            "Accept": "form-data",
            body : new URLSearchParams({
                "user" : user,
                "producto" : producto
            })
        })
            .then(response => {
                if(response.ok && response.status === 200){
                    document.getElementById(id).remove();
                }else{
                    throw Error()
                }
            })
            .catch(error => console.log(error.message))

    }
    const add = () => {
        //document.getElementById(id).remove();
        let url = `/api/inventario/add`
        let producto = document.getElementById(prod_id).value
        let user = localStorage.getItem("user")
        fetch(url,{
            method: "post",
            "Content-Type": "application/x-www-form-urlencode",
            "Accept" : "application/x-www-form-urlencode",
            body: new URLSearchParams({
                "producto" : producto,
                "user": user
            })
        })
            .then(response => {
                if(response.status === 200 && response.ok){
                    document.getElementById(id).remove();
                }else{
                    return response.text();
                }
            })
            .then(response => console.log(response))
            .catch(error => console.log(error.message))
    }
    let id = uniqueId("product_");
    let prod_id = uniqueId("prod_id")
    let del_id = uniqueId("del_id");
    let add_id = uniqueId("add_id")
    return <>
        <form id={id} className={"product__container--item"} key={props.id} onSubmit={prevDefault}>
            <input type={"hidden"} value={props.Id} id={prod_id}/>
            <div>{props.nombre}</div>
            <div>{props.cantidad}</div>
            <div>{props.precio}</div>
            <div>{parseFloat(props.cantidad) * parseFloat(props.precio)}</div>
            <div><button onClick={add} id={add_id} className={"button__add"}>Agregar</button></div>
            <div><button onClick={del} id={del_id} className={"button__sub"}>Eliminar</button></div>
        </form>
    </>
}
export default ListaItem;

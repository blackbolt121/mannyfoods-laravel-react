import Counter from "./Counter";
import {uniqueId} from "lodash/util";
import {useState} from "react";
const InventoryRow = (props) => {
    let counter_id = uniqueId("counter__");
    let inv_row = uniqueId("inv_row__");
    let inv_cant = uniqueId("inv_cant__");
    let [max, setMax] = useState(props.cantidad)
    const reduceProduct = (e)=> {
        e.preventDefault();
        let url = "/api/inventario"
        let idProducto = props.idProducto;
        fetch(url, {
            method: "put",
            "Content-Type":"application/x-www-form-urlencoded",
            "Accept":"application/x-www-form-urlencoded",
            body : new URLSearchParams({
                "user": localStorage.getItem("user"),
                "producto" : idProducto,
                "cantidad": document.getElementById(counter_id).value
            })
        })
            .then(response => {
                if(response.ok && response.status === 200){
                    let op = parseInt(document.getElementById(inv_cant).innerText) - document.getElementById(counter_id).value;
                    if( op <= 0 ){
                        document.getElementById(inv_row).remove();
                    }else{
                        document.getElementById(inv_cant).innerText = op;
                        setMax(op);
                    }
                    return response.text();
                }else{
                    return response.text();
                }
            })
            .then(response => console.log(response))
            .catch(error => console.log(error.message))
    }
    return <div id={inv_row} className={"dashboard__invetoryList--row"}>
        <div className={"dashboard__invetoryList--text"}>{props.nombre}</div>
        <div id={inv_cant} className={"dashboard__invetoryList--text"}>{props.cantidad}</div>
        <div className={"dashboard__invetoryList--text"}>{props.min}</div>
        <form className={"dashboard__inventoryList--counter"} onSubmit={reduceProduct}>
            <Counter idName={counter_id} min={1} max={max}/>
            <button className={"dashboard__inventoryList--submit"}>Eliminar</button>
        </form>
    </div>
}
export default InventoryRow;

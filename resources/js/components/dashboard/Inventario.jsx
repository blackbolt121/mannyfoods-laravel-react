import HeaderList from "./HeaderList";
import {useEffect} from "react";
import "./styles/Inventario.css"
import {useState} from "react";
import InventoryRow from "./InventoryRow";
import {uniqueId} from "lodash/util";
const Inventario = () => {
    const [inventory, setInventory] = useState(<div className={"dashboard__invetoryList--body"}><p>Cargando...</p></div>)
    useEffect(() => {
        let url = `/api/inventario/${localStorage.getItem("user")}`;
        fetch(url)
            .then(response => {
                if( response.ok && response.status === 200 ){
                    return response.json();
                }
            })
            .then(datas => {
                if(datas.length == 0){
                    setInventory(<div className={"dashboard__invetoryList--body"}><p>No hay nada en el inventario</p></div>);
                }else{
                    setInventory(<div className={"dashboard__invetoryList--body"}>{
                        datas.map(data => {
                            return <>
                                <InventoryRow key={uniqueId("inventory_row__")}
                                    nombre={data.nombre}
                                    cantidad={data.cantidad}
                                    min={data.min}
                                    idProducto={data.id}
                                />
                            </>

                        })
                    }</div>);
                }
            })
    }, []);

    return <>
        <HeaderList ClassName={"dashboard__invetoryList--header"} headerItems={["Nombre","Cantidad","Minimo","Quitar"]}/>
        {inventory}
    </>
}
export default Inventario;

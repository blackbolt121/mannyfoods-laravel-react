import "./styles/Lista.css"
import HeaderList from "./HeaderList";
import {useState} from "react";
import {useEffect} from "react";
import ListaItem from "./ListaItem";
export default function Lista () {
    const [product, setProduct] = useState(<div className={"dashboard__invetoryList--body"}><p>Cargando...</p></div>);
    let user = localStorage.getItem("user")
    let url = `/api/lista/${user}`
    useEffect(() => {
        fetch(url)
            .then(response => {
                    if (response.status === 200 && response.ok) {
                        return response.json();
                    }
                }
            ).then(listas => {
                if(listas.length == 0){
                    setProduct(<div className={"dashboard__invetoryList--body"}><p>No hay nada por comprar</p></div>)
                }else{
                    setProduct(listas.map(lista => <ListaItem
                        nombre={lista.nombre}
                        Id={lista.id}
                        cantidad={lista.cantidad}
                        precio={lista.precio}
                    />))
                }
        })
            .catch(error => console.log(error.message))
    }, []);

    return <>
        <HeaderList headerItems={["Nombre","Cantidad","Precio Aproximado","Total", "Registrar", "Eliminar"]}/>
        <div className={"product__container"}>
            {product}
        </div>
    </>
}

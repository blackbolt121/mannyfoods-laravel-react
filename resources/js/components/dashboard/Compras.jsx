import HeaderList from "./HeaderList";
import "./styles/Compras.css";
import {useState} from "react";
import {useEffect} from "react";
import Counter from "./Counter";
import {Navigate} from "react-router-dom";
function Compras(){
    const [department, setDepartment] = useState()
    const [subdepartment, setSubDepartment] = useState()
    const [product, setProduct] = useState()
    const [disabled, setDisabled] = useState(true)
    const [navigate, setNavigate] = useState()
    let departments = []
    let opt = <option value={0}>Sin seleccionar</option>
    useEffect(() => {
        fetch("/api/departments")
            .then(response => {
                if(response.ok && response.status === 200){
                    return response.json()
                }
            })
            .then(response => {
                try{
                    departments = response.map(department => <option key={department.id} value={department.id}>{department.nombre}</option>)
                }catch{
                    departments = []
                }
                setDepartment(departments)
                setDisabled(true)
            })
            .catch(error => {
                console.log(error.message, typeof(setDepartment), typeof(department))
            });

    }, []);
    const listSubDepartments = () =>{
        let dept = document.getElementById("departamento");
        setDisabled(true)
        if( dept.value != 0){
            let id_dept = dept.value;
            let url = `/api/subdepartements/${id_dept}`
            setSubDepartment([]);
            setProduct([]);
            fetch(url)
                .then(response => {
                    if(response.status === 200 && response.ok)
                        return response.json();
                })
                .then(subdepartments => {
                    setSubDepartment(subdepartments.map(subdepartment=> <option key={subdepartment.id} value={subdepartment.id}>{subdepartment.nombre}</option>))
                })
                .catch(error=>{
                    console.log(error.message)
                })
        }else{
            setSubDepartment([]);
        }
    }
    const getProducts = () => {
        let subdept = document.getElementById("subdepartamento");
        setDisabled(true)
        if(subdept.value != 0){
            let url = `/api/products/subdepartment/${subdept.value}`;
            fetch(url)
                .then(response => {
                    if(response.status === 200 && response.ok){
                        return response.json()
                    }
                })
                .then(products => {
                    setProduct(products.map( product => <option key={product.id} value={product.id}>{product.nombre}</option>));
                })
        }else{
            setProduct([]);
        }
    }
    const changeProduct = ()=>{
        let dept = document.getElementById("departamento").value;
        let sdept = document.getElementById("subdepartamento").value;
        let product = document.getElementById("producto").value;
        if( [dept,sdept,product].filter(x => x == 0).length == 0 ){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }
    const comprasSubmit = (e) => {
        e.preventDefault();
        let product  = document.getElementById("producto").value;
        let cantidad = document.getElementById("product_amount").value;
        let user     = localStorage.getItem("user");
        if( user != undefined) {
            try {
                let data = new FormData();
                data.append("producto", parseInt(product));
                data.append("user", parseInt(user))
                data.append("cantidad", parseInt(cantidad))
                fetch("/api/lista/add", {
                    method: "POST",
                    "Content-Type": "x-www-form-urlencoded",
                    "Accept": "x-www-form-urlencoded",
                    body: data
                }).then(response => {
                    if (response.ok && response.status === 200) {
                        setNavigate(<Navigate to={"/dashboard"}/>)
                    }
                })
                    .catch(error => console.log(error.message));
            }
            catch{

            }
        }
    }
    return <>
        {navigate}
        <form className={"compras__form"} onSubmit={comprasSubmit}>
            <select id={"departamento"} name={"departamento"} placeholder={"Department"} onChange={listSubDepartments}>
                {opt}
                {department}
            </select>
            <br/>
            <select id={"subdepartamento"} name={"subdepartamento"} placeholder={"Subdepartment"} onChange={getProducts}>
                {opt}
                {subdepartment}
            </select>
            <br/>
            <select id={"producto"} placeholder={"product"} onChange={changeProduct}>
                {opt}
                {product}
            </select>
            <Counter idName="product_amount" min={1} initial = {1}/>
            {disabled?null : <button type={"submit"}>Agregar</button>}
        </form>

    </>
}
export default Compras;


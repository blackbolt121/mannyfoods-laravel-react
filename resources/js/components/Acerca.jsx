import { Component } from "react";
import Nav from "./NavBar";
import "../styles/Acerca.css"
function container(props){
    return <div key={props.title} className="container acerca__container">
        <img src={props.image} alt=""/>
        <div className="line"/>
        <h3>{props.title}</h3>
        <div className="line"/>
        <p>{props.text}</p>
        <div className="line"/>
    </div>
}

export default class Acerca extends Component{
    
    
    render() {
        let content = [{
            image: "https://www.eleconomista.com.mx/__export/1628561719443/sites/eleconomista/img/2021/08/09/meses-interes1_100821w.jpg_1084158909.jpg",
            title: "Somos el servicio especializado en el control de tu inventario",
            text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus earum corporis, recusandae pariatur perferendis architecto consectetur odio nostrum voluptatem eius iste velit consequatur. Dicta facilis sed hic animi dolor aut. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque eum possimus, velit ipsam iusto nisi odit unde sed adipisci officia dolore doloribus nobis quo cum asperiores ipsa expedita autem facere?"
        },
        {
            image: "https://www.comercialtrevino.com/wp-content/uploads/elementor/thumbs/como-hacer-compras-inteligentes-pdel7rzoh8kgstdfma1s9080otiaa2ckfc7al365jc.jpg",
            title: "¿Por qué creamos el servicio",
            text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus earum corporis, recusandae pariatur perferendis architecto consectetur odio nostrum voluptatem eius iste velit consequatur. Dicta facilis sed hic animi dolor aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex labore dignissimos dolorum nam obcaecati, enim, expedita rem veritatis ipsam ullam placeat quia pariatur quod soluta nobis tempore nemo distinctio harum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt saepe, ad vel eligendi corrupti neque pariatur quam suscipit, laboriosam hic quia consectetur adipisci. Magnam quo, aut similique velit ab sequi."
        },
        {
            image: "https://images.squarespace-cdn.com/content/v1/56c20f7cd51cd440f4c1f656/1636742765563-SQG8J5F9T7U9RT6ZP2O4/shopping-g302630830_1280.jpg?format=1500w",
            title: "Hacer un listado de compras, nunca fue tan fácil",
            text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus earum corporis, recusandae pariatur perferendis architecto consectetur odio nostrum voluptatem eius iste velit consequatur. Dicta facilis sed hic animi dolor aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex labore dignissimos dolorum nam obcaecati, enim, expedita rem veritatis ipsam ullam quos ipsam aliquam laboriosam hic suscipit excepturi?"
        }]
        return (
            <>
                <Nav/>
                <div className="container">
                    {content.map(x=>container(x))}
                </div>
             </>
        );
    }
}
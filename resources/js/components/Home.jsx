import { Component } from "react";
import { Link } from "react-router-dom";
import Nav from "./NavBar";
import Container from "./Container";
import "../styles/Home.css"

class Option extends Component {
    render() {
        return (
            <div className="container">
                <img src={this.props.image} alt="" />
                <h2>{this.props.anounce}</h2>
                <p>{this.props.lorem}</p>
            </div>
        );
    }
}

export default class Home extends Component {
    render() {
        let login = "/login"
        let content1 = {
            title:
                <>
                    <h1>Lleva el control de tu despensa y las compras del super de manera inteligente</h1>
                </>
            ,
            button:
                <>
                    <Link to={login} className="button">
                        Empieza ahora
                    </Link>
                </>

        }
        let content2 = [
            {
                image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQL2EvrB3DWcaOuc5d4V8iBezR0FrfhyP3CGVR_LMPZEKPesEHg",
                title: "Tu lista de super automática",
                text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex provident possimus reprehenderit distinctio vero et odit tempore nulla excepturi id, officiis eligendi modi perferendis dicta aspernatur in aperiam culpa explicabo!"
            },
            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAGVtVdk48cJDKdqVxgAqJjcRZ2i-o3xejkAT1r36tjKCT97ih",
                title: "Control de inventario",
                text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex provident possimus reprehenderit distinctio vero et odit tempore nulla excepturi id, officiis eligendi modi perferendis dicta aspernatur in aperiam culpa explicabo!"
            },
            {
                image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRHbCewNJzJK7xsBpPhL6NSYljusHGAE7-tYP_8sBsdjgZcSc55",
                title: "Presupuesto automático",
                text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex provident possimus reprehenderit distinctio vero et odit tempore nulla excepturi id, officiis eligendi modi perferendis dicta aspernatur in aperiam culpa explicabo!"
            }
        ]
        return (
            <>
                <Nav />
                <Container
                    title={content1.title}
                    body={content1.button}
                    className="home__empieza" />
                <div className="home__options">
                    {content2.map(
                        x=>{
                            return <Option key={x.title} image={x.image} anounce={x.title} lorem={x.text}/>
                        }
                    )
                    }       
                </div>
            </>
        );
    }
}
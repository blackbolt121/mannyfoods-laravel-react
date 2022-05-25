import { Component, Fragment } from "react";
import Nav from "./NavBar";
import "../styles/NotFound.css"
export default class NotFound extends Component{
    render() {
        return (
            <Fragment>
                 <Nav></Nav>
                 <div className="container notfound">
                     <h1>404</h1>
                     <p>Page not found!</p>
                 </div>
             </Fragment>
        );
    }
}
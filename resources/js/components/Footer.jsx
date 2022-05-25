import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css"

export default class Footer extends Component{
    render() {
        return (
             <Fragment>
                 <footer>
                    <div className="footer">
                        <nav className="menu__footer">
                            <Link to="/">Home</Link>
                            <Link to="/Acerca">Acerca</Link>
                            <Link to="/Contacto">Contacto</Link>
                        </nav>
                        <div className="copy">
                            &copy; Todos los derechos reservados
                        </div>
                    </div>
                 </footer>
             </Fragment>
        );
    }
}
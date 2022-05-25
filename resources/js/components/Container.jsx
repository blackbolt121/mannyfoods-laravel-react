import { Component} from "react";
class Container extends Component{
    render(){
        return (
            <div className={`container ${this.props.className}`}>
                {this.props.title}
                {this.props.body}
            </div>
        )
    }
}
Container.defaultProps = {
    title: "Add a title",
    className: "",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident, illo. Qui officiis reprehenderit animi dicta adipisci impedit ipsa eligendi, pariatur, repellendus, molestias ea voluptas nulla a consequuntur incidunt doloribus magni."
}
export default Container;
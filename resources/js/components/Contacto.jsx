import Nav from "./NavBar"
import Container from "./Container";
const Section = (props) =>{
    return <Container title={<h1>{props.title}</h1>} body={<p>{props.body}</p>}/>
}
const Contacto = () => {
    const text = <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae facere ut quae delectus reprehenderit repellendus autem, alias, eum distinctio et, quas sequi maxime! Facere temporibus voluptate ex, facilis deleniti unde! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore nobis nisi atque sequi quos excepturi possimus id enim soluta, numquam modi obcaecati asperiores maiores aperiam recusandae. Sequi laudantium illum qui!</span>
    return <>
        <Nav/>
        <title />
        <div className="">
            <Section title="Pongase en contacto con nosotros" body={text}/>
        </div>
    </>
}
export default Contacto;

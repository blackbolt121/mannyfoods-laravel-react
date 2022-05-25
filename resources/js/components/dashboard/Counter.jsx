import {useState} from "react";
import {uniqueId} from "lodash/util";
import "./styles/Counter.css"
let id1 = uniqueId("subs-")
let id2 = uniqueId("add-")
const Counter = (props) =>{
    let [val, setVal] = useState(props.initial);
    const handleUpdate1 = (e)=>{
        if(val < props.max) {
            setVal(val+1)
        }
    }
    const handleUpdate2 = (e)=>{
        if( props.min < val ) {
            setVal(val-1)
        }
    }
    const handleChange = (val) => {
        setVal(val)
    }
    return <div className={"counter__component"}>
        <button className={"counter__component--sub"} id={id1} type={"button"} onClick={handleUpdate2}>-</button>
        <input id={props.idName} name={props.idName} type={"number"} value={val} onChange={handleChange} min={props.min} max={props.max} readOnly={"readonly"}/>
        <button className={"counter__component--add"} id={id2} type={"button"} onClick={handleUpdate1}>+</button>
    </div>
}
Counter.defaultProps = {
    initial: 1,
    max: 100,
    min: 0,
    idName: uniqueId("counter_")
}
export default Counter;

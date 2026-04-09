import React,{useState}from "react";
import "./ToDoIteam.css"
import AddIcon from '@mui/icons-material/Add';

function ToDoList(props){
const [item , setitem ] = useState("")

function handleChange(event){
    setitem(event.target.value);
  }


function hanldeClick(event) {
    props.additem(item)
    setitem("");
    event.preventDefault();
}


return(

    <div className="input-container">
     <input   type="checkbox" className="input" value={item} onChange={handleChange}type="text" name="task" placeholder="Add a new task..."  required  />
      <button className="add-btn"onClick={hanldeClick}><AddIcon/></button>
    </div>
)
}


export default ToDoList
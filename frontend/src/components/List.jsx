import React from "react"
import "./List.css"


function List(props){
    
    function handleClick(){
    props.delete(props.id)
}

 return(
    <p className="todo-content" 
    onClick={handleClick}>
        {props.list}</p>
)

}

export default List ;


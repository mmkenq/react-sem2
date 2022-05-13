import React from "react";
import './button.css'


function Button(props){
   const {title, name, onClick} = props;
    
    return(
        <div
            className="headerBut"
            name={name}
            onClick={onClick}
        >
            {title}
        </div>
    );
}

export default Button
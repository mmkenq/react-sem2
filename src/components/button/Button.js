import React from "react";
import './button.css'


class Button extends React.Component{
    
    constructor(props) {
        super(props);
        const {title} = props;
        this.title = title;
    };

    render(){
        return(
            <div className="field"
                onClick={()=>console.log(this)}
            > {this.title}</div>
        );
    }
}

export default Button
import React from "react";
import Button from "../button/Button";
import Graph2D from "../graph2d/Graph2D";

import './header.css';


function setActiveButton(name){
    this.setState({activeButton: name})
}

function Header(props){
    // function setActiveButton(ev){
    //     console.log(ev.target)
    // }


    const {activeButton, setActiveButton} = props;
    this.state = {activeButton};
    this.setAttributeButton = setActiveButton;

    

    return(
        <div id="header">
            <h1>FUCK REACT STUFF</h1>
            <Button
                title = 'graph2dДА'
                name='graph2d'
                // onClick={(ev)=>setActiveButton(ev.target)}>
                onClick={(ev)=>setActiveButton("graph2d")}>
            </Button>
            <Button title = 'graph3dДА' name='graph3d'></Button>
            <Button title = 'calculatorsДА' name='calculators'></Button>
        </div>
    );
}

export default Header
import React from "react";
import Button from "../button/Button";
import Graph2D from "../graph2d/Graph2D";

import './header.css';


function Header(props){
    function setActiveButton(el){
        console.log(el)
        console.log(this)
    }

    return(
        <div id="header">
            <h1>FUCK REACT STUFF</h1>
            <Button
                title = 'graph2dДА'
                name='graph2d'
                onClick={setActiveButton}>
            </Button>
            <Button title = 'graph3dДА' name='graph3d'></Button>
            <Button title = 'calculatorsДА' name='calculators'></Button>
        </div>
    );
}

export default Header
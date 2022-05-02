import React from "react";
import Button from "../button/Button";

class Graph2D extends React.Component{
    render(){
        return(
            <div id="graph2d">
                <h1>GRAPH 2D</h1>
                {/*<UI2D></UI2D>
                <Canvases></Canvases>*/}
                <Button title='addFunc'></Button>
            </div>
        );
    }
}

export default Graph2D
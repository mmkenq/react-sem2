import React from "react";
import Button from "../button/Button";

class Graph3D extends React.Component{
    render(){
        return(
            <div id="graph3d">
                <h1>GRAPH 3D</h1>
                {/*<UI3D></UI3D>
                <Canvases></Canvases>*/}
                <Button title='add Function' name='addFunc'></Button>
            </div>
        );
    }
}

export default Graph3D
import React from "react";
import Button from "../button/Button";

class Calculator extends React.Component{
    render(){
        return(
            <div id="calculator">
                <h1>CALCULATOR</h1>
                {/*<UICalculator></UICalculator>
                <Canvases></Canvases>*/}
                <Button title='add Function' name='addFunc'></Button>
            </div>
        );
    }
}

export default Calculator
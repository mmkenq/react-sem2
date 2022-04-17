import React from "react";
import Button from "../button/Button";

class Header extends React.Component{
    render(){
        return(
            <div>
                <h1>ANIME STUFF</h1>
                <Button title = 'graph2d'></Button>
                <Button title = 'graph3d'></Button>
                <Button title = 'calculators'></Button>
            </div>
        );
    }
}

export default Header
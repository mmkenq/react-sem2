import { useState } from 'react';

import Button from "../button/Button";

import './header.css';

function Header(props) {
    const { activeButton, setActiveButton } = props;
    const [active, setActive] = useState(activeButton);

    const setActiveButtonClick = (page) => {
        setActiveButton(page);
        setActive(page);
    };

    return (
        <div id="header">
            <h1>REACT</h1>
            <Button
                page='graph2d'
                title='graph2dДА'
                active={active === 'graph2d'}
                onClick={(page) => setActiveButtonClick(page)}
            ></Button>
            <Button
                page='graph3d'
                title='graph3dДА'
                active={active === 'graph3d'}
                onClick={(page) => setActiveButtonClick(page)}
            ></Button>
            <Button
                page='calculator'
                title='calculatorsДА'
                active={active === 'calculator'}
                onClick={(page) => setActiveButtonClick(page)}
            ></Button>
        </div>
    );
}

export default Header;
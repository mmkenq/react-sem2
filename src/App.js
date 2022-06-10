import { useState } from 'react';

import Header from './components/header/Header'
import Calculator from './components/calculator/Calculator'
import Graph2D from './components/graph2d/Graph2D'
import Graph3D from './components/graph3d/Graph3D'
import Outliner from './components/outliner/Outliner'
import Point from './components/graph3d/entities/Point'
import Light from './components/graph3d/entities/Light'

import './App.css';

function App() {
	const [activeButton, setActiveButton] = useState('graph3d');

	return (
		<div className="App">
			<Header
				activeButton={activeButton}
				setActiveButton={setActiveButton}
			></Header>
			{
			activeButton === 'graph2d' ?
				<Graph2D
					    win = {{
					        // относительно начала координат
				        	left: -10,
				        	bottom: -10,
				        	// относительно всего canvas'a
				        	width: 20,
				        	height: 20,
    					}}
    					stdFuncs = {[
					        {
					            f: function(x){return Math.sin(x)},
					            name:'sin x ',
					            isActive: false,
					            color: '#0dd7ff',
					            width: null,
					            zeroes: { have: false, a: null, b: null },
					        },
					        {
					            f: function(x){return Math.cos(x)},
					            name: 'cos x',
					            isActive: false,
					            color: '#ff9100',
					            width: null,
					            zeroes: { have: false, a: null, b: null },
					        },
					        {
					            f: function(x){return Math.abs(x)},
					            name: '| x |',
					            isActive: false,
					            color: '#e5ff00',
					            width: null,
					        },
					        {
					            f: function(x){return x*x},
					            name: 'x^2',
					            isActive: false,
					            color: '#ff057a',
					            width: null,
					        },
					        {
					            f: function(x){return x*x*x},
					            name: 'x^3',
					            isActive: false,
					            color: '#44e364',
					            width: null,
					        },
					   ]}
				></Graph2D> :
			activeButton === 'graph3d' ?
				<Graph3D
				    win = {{
				        // относительно начала координат
				        left: -5,
				        bottom: -5,
				        // относительно всего canvas'a
				        width: 10,
				        height: 10,

				        camera: new Point(0,0,60),
				        display: new Point(0,0,30),
				        light: new Light(25, 25, -25, 45000),
				    }}
				></Graph3D> :
			activeButton === 'calculator' ?
				<Calculator></Calculator> :
			activeButton === 'outliner' ?
				<Outliner></Outliner> : ''
			}
		</div>
	);
}

export default App;

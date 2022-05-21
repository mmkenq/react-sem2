import { useState } from 'react';

import Header from './components/header/Header'
import Calculator from './components/calculator/Calculator'
import Graph2D from './components/graph2d/Graph2D'
import Graph3D from './components/graph3d/Graph3D'

import './App.css';

function App() {
	const [activeButton, setActiveButton] = useState('graph2d');

	return (
		<div className="App">
			<Header
				activeButton={activeButton}
				setActiveButton={setActiveButton}
			></Header>
			{
			activeButton === 'calculator' ?
				<Calculator></Calculator> :
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
    					userFuncs = {[]}
    					stdFuncs = {[
					        {
					            f: function(x){return Math.sin(x)},
					            name:'sin x ',
					            isActive: false,
					            color: '#0dd7ff',
					            width: null,
					            // TODO
					            zeroes: { have: false, a: null, b: null },
					        },
					        {
					            f: function(x){return Math.cos(x)},
					            name: 'cos x',
					            isActive: false,
					            color: '#ff9100',
					            width: null,
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
				<Graph3D></Graph3D> : ''}
		</div>
	);
}

export default App;

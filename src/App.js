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
			{activeButton === 'calculator' ? <Calculator></Calculator> :
				activeButton === 'graph2d' ? <Graph2D></Graph2D> :
					activeButton === 'graph3d' ? <Graph3D></Graph3D> : ''}
		</div>
	);
}

export default App;

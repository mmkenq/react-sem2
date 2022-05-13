
import Header from './components/header/Header'
import Calculator from './components/calculator/Calculator'
import Graph2D from './components/graph2d/Graph2D'
import Graph3D from './components/graph3d/Graph3D'
import {useState} from 'react'

// import logo from './logo.svg';
import './App.css';

function App() {
	const [activeButton, setActiveButton] = useState('graph2d');

	return (
		<div className = "App">
			<Header
				activeButton = 'graph2d'
				setActiveButton = 'graph2d'
			></Header>
		</div>
		// {activeButton === 'calculator' ? <Calculator></Calculator> :
		//  activeButton === 'graph2d' ? <Graph2D></Graph2D> :
		//  activeButton === 'graph3d' ? <Graph3D></Graph3D> : '' }
	);
}

export default App;

import { useRef, useEffect } from 'react';
import Cube from '../../entities/figures/Cube'
import Cylinder from '../../entities/figures/Cylinder'
import Sphere from '../../entities/figures/Sphere'
import Pyramid from '../../entities/figures/Pyramid'
import Cone from '../../entities/figures/Cone'
import DoublePlanes from '../../entities/figures/DoublePlanes'
import CrossedPlanes from '../../entities/figures/CrossedPlanes'
import Ellipsoid from '../../entities/figures/Ellipsoid'
import Sphere2 from '../../entities/figures/Sphere2'
import oneLineHyperBoloid from '../../entities/figures/oneLineHyperBoloid'

function Canvas3DUI(props){
	const {num, userFigs, callbacks} = props;
	let ui = useRef(null);
	let figNum = 0;
	const objects = [
		'cube',
		'cylinder',
		'pyramid',
		'cone',
		'doublePlanes',
		'crossedPlanes',
		'ellipsoid',
		'sphere',
		'sphere2',
		'oneLineHyperBoloid',
	];
	
	function newFigure(figName){
		switch(figName){
			case 'cube': return new Cube();
			case 'cylinder': return new Cylinder();
			case 'sphere': return new Sphere();
			case 'pyramid': return new Pyramid();
			case 'cone': return new Cone();
			case 'doublePlanes': return new DoublePlanes();
			case 'crossedPlanes': return new CrossedPlanes();
			case 'ellipsoid': return new Ellipsoid();
			case 'sphere2': return new Sphere2();
			case 'oneLineHyperBoloid': return new oneLineHyperBoloid();
			default: return null;
		}
	}

	function addFigure(){
		userFigs.push({
            isActive: true,
            subject: new oneLineHyperBoloid(),
            // center: new Point(0,0,0),
            color: '#c04d59',
            width: 2,
            showPoints: true,
            showEdges: true,
            showPolygons: true,
            name: 'cube',
        });

        callbacks.render();
        // console.log(userFigs)
	}

	function changeFigure(num, subject, color, linewidth, name){
        userFigs[num].subject = subject || userFigs[num].subject;
        userFigs[num].color = color;
        userFigs[num].width = linewidth;
		userFigs[num].name = name;
        callbacks.render();
		// console.log(userFigs);
	}

	function changeFigureXYZ(num, offsetX, offsetY, offsetZ){
        userFigs[num].subject.points.forEach((point)=>{
            point.x += offsetX;
            point.y += offsetY;
            point.z += offsetZ;
        });
        callbacks.render();
	}

	// TODO:
	// function delFigure(){}

	useEffect(()=>{
		ui.current = {
			parent: document.getElementsByClassName('ui3d')[num],
			buts: document.getElementsByClassName('buts3d')[num],
			figs: document.getElementsByClassName('funcs3d')[num],
		};


		let addBut = document.createElement('button');
		addBut.innerHTML = 'add Figure'
		addBut.addEventListener('click',()=>{
			addFigure();

			let figInputs = document.createElement('div');
			figInputs.dataset.num = figNum;
			figInputs.setAttribute('class','userInputs');

			let x = document.createElement('input');
			let y = document.createElement('input');
			let z = document.createElement('input');
			x.value = 0; x.setAttribute('placeholder', 'x');
			y.value = 0; y.setAttribute('placeholder', 'y');
			z.value = 0; z.setAttribute('placeholder', 'z');
			x.id = 'newFigureX';
			y.id = 'newFigureY';
			z.id = 'newFigureZ';
			x.addEventListener('change', ()=>{
				changeFigureXYZ(figInputs.dataset.num, Number(x.value), 0, 0);
		    });
		    y.addEventListener('change', ()=>{
				changeFigureXYZ(figInputs.dataset.num, 0, Number(y.value), 0);
		    });
			z.addEventListener('change', ()=>{
				changeFigureXYZ(figInputs.dataset.num, 0, 0, Number(z.value));
		    });
			figInputs.appendChild(x);
			figInputs.appendChild(y);
			figInputs.appendChild(z);

			let color = document.createElement('input');
			color.setAttribute('placeholder', 'color');
			color.addEventListener('keyup', ()=>{
				try{ changeFigure(figInputs.dataset.num, null, color.value, linewidth.value, name.value); }
				catch(e){console.log(e)};
			});
			figInputs.appendChild(color);

			let linewidth = document.createElement('input');
			linewidth.setAttribute('placeholder', 'linewidth');
			linewidth.addEventListener('keyup', ()=>{
				try{ changeFigure(figInputs.dataset.num, null, color.value, linewidth.value, name.value); }
				catch(e){console.log(e)};
			});
			figInputs.appendChild(linewidth);			

			let name = document.createElement('input');
			name.setAttribute('placeholder', 'name');
			name.addEventListener('keyup', ()=>{
				try{ changeFigure(figInputs.dataset.num, null, color.value, linewidth.value, name.value); }
				catch(e){console.log(e)};
			})
			figInputs.appendChild(name);	

			let changeFigBut = document.createElement('select');
			objects.forEach((el)=>{
				let option = document.createElement('option');
				option.innerHTML = el;
				if(el === 'sphere') option.innerHTML = 'СФЕРА ХУЛИ'; // xd
 				option.value = el;
				option.addEventListener('click',()=>
					{
						changeFigure(
							figInputs.dataset.num,
							newFigure(el),
						 	color.value,
						 	linewidth.value,
							name.value||el);
					});

				changeFigBut.appendChild(option);
			});
			figInputs.appendChild(changeFigBut);
			ui.current.figs.appendChild(figInputs);
			figNum++;
		});
		
		ui.current.buts.appendChild(addBut)

	})

	return(
		<div className='ui3d'>
			<div className='buts3d'></div>
			<div className='funcs3d'></div>
		</div>
	);
}


export default Canvas3DUI;
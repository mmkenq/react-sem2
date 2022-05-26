import { useRef, useEffect } from 'react';
import Cube from '../../entities/figures/Cube'
import Cylinder from '../../entities/figures/Cylinder'
import Pyramid from '../../entities/figures/Pyramid'
import Cone from '../../entities/figures/Cone'
import DoublePlanes from '../../entities/figures/DoublePlanes'
import CrossedPlanes from '../../entities/figures/CrossedPlanes'
import Sphere from '../../entities/figures/Sphere'
import Sphere2 from '../../entities/figures/Sphere2'
import Ellipsoid from '../../entities/figures/Ellipsoid'
import OneLineHyperboloid from '../../entities/figures/OneLineHyperboloid'
import HyperbolicParaboloid from '../../entities/figures/HyperbolicParaboloid'
import EllipticParaboloid from '../../entities/figures/EllipticParaboloid'
import TwoLineEllipticParaboloid from '../../entities/figures/TwoLineEllipticParaboloid'
import ParabolicCylinder from '../../entities/figures/ParabolicCylinder'
import HyperbolicCylinder from '../../entities/figures/HyperbolicCylinder'

function Canvas3DUI(props){
	const {num, userFigs, callbacks} = props;
	let ui = useRef(null);
	let figNum = 0;

	const objects = [
		{id:'cube', title: 'куб'},
		{id: 'pyramid',title: 'пирамида'},
		{id: 'cylinder', title: 'очко'},
		{id: 'doublePlanes', title: 'стены'},
		{id: 'crossedPlanes', title: 'стены друг в друге'},
		{id: 'parabolicCylinder', title: 'кривая стена'},
		{id: 'hyperbolicCylinder', title: 'две кривых стены'},
		{id: 'cone', title: 'конус'},
		{id: 'sphere', title: 'СФЕРА ХУЛИ'},
		{id: 'sphere2', title: 'сфера'},
		{id: 'ellipsoid', title: 'эллипсод'},
		{id: 'oneLineHyperboloid', title: 'однополосный гиперболоид'},
		{id: 'hyperbolicParaboloid', title: 'чипса'},
		{id: 'ellipticParaboloid', title: 'шапка'},
		{id: 'twoLineEllipticParaboloid', title: 'две шапки'},
	];

	const scaleWays = [
		'+', '-',
		'x+', 'x-',
		'y+', 'y-',
		'z+', 'z-',
	];

	const showDetails = [
		{id: 'showPoints', title: 'Points'},
		{id: 'showEdges', title: 'Edges'},
		{id: 'showPolygons', title: 'Polygons'}
	];

	function newFigure(figName){
		switch(figName){
			case 'cube': return new Cube();
			case 'cylinder': return new Cylinder();
			case 'sphere': return new Sphere();
			case 'sphere2': return new Sphere2();
			case 'ellipsoid': return new Ellipsoid();
			case 'pyramid': return new Pyramid();
			case 'cone': return new Cone();
			case 'doublePlanes': return new DoublePlanes();
			case 'crossedPlanes': return new CrossedPlanes();
			case 'oneLineHyperboloid': return new OneLineHyperboloid();
			case 'hyperbolicParaboloid': return new HyperbolicParaboloid();
			case 'hyperbolicCylinder': return new HyperbolicCylinder();
			case 'ellipticParaboloid': return new EllipticParaboloid();
			case 'twoLineEllipticParaboloid': return new TwoLineEllipticParaboloid();
			case 'parabolicCylinder': return new ParabolicCylinder();
			default: return null;
		}
	}

	function addFigure(){
		userFigs.push({
            isActive: true,
            subject: new Cube(),
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

	function scaleFigure(num, way){
        let delta = 1.1;
        switch(way){
            case 'x+':
                userFigs[num].subject.points.forEach(point => point.x *= delta);
                break;
            case 'x-':
                userFigs[num].subject.points.forEach(point => point.x /= delta);
                break;
            case 'y+':
                userFigs[num].subject.points.forEach(point => point.y *= delta);
                break;
            case 'y-':
                userFigs[num].subject.points.forEach(point => point.y /= delta);
                break;
            case 'z+':
                userFigs[num].subject.points.forEach(point => point.z *= delta);
                break;
            case 'z-':
                userFigs[num].subject.points.forEach(point => point.z /= delta);
                break;
            case '+':
                userFigs[num].subject.points.forEach(point => {
                		point.x *= delta;
                		point.y *= delta;
                		point.z *= delta;
                	}
                );
                break;
            case '-':
                userFigs[num].subject.points.forEach(point => {
                		point.x /= delta;
                		point.y /= delta;
                		point.z /= delta;
                	}
                );
                break;
           	default: return;
        }
        callbacks.render();
    };

    function toggleDetail(num, detail){
		switch(detail.id){
            case 'showPoints':
                userFigs[num].showPoints = !userFigs[num].showPoints;
                break;
            case 'showEdges':
                userFigs[num].showEdges = !userFigs[num].showEdges;
                break;
            case 'showPolygons':
                userFigs[num].showPolygons = !userFigs[num].showPolygons;
                break;
            default: return;
        };
        callbacks.render();
    };

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

			scaleWays.forEach(way => {
				let scaleBut = document.createElement('button');
				scaleBut.innerHTML = way;
				scaleBut.addEventListener('click', ()=>{
					scaleFigure(figInputs.dataset.num, way);
				});
				figInputs.appendChild(scaleBut);
			});

			showDetails.forEach(detail => {
				let showDetail = document.createElement('input');
				showDetail.setAttribute('id', detail.id);
				showDetail.setAttribute('type', 'checkbox');
				// TODO: be able to get the state of the detail in userFigs
				showDetail.checked = true;
				let label = document.createElement('label');
				label.setAttribute('for', detail.id);
				label.innerHTML = detail.title;

				showDetail.addEventListener('change', ()=>{
					toggleDetail(figInputs.dataset.num, detail);
				});
				figInputs.appendChild(showDetail);
				figInputs.appendChild(label);
			});

			let changeFigBut = document.createElement('select');
			objects.forEach((el)=>{
				let option = document.createElement('option');
				option.innerHTML = el.title;
 				option.value = el.id;
				option.addEventListener('click',()=>
					{
						changeFigure(
							figInputs.dataset.num,
							newFigure(el.id),
						 	color.value,
						 	linewidth.value,
							name.value||el.id);
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
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
		{id: 'cylinder', title: 'циллиндр'},
		{id: 'doublePlanes', title: 'параллельные плоскости'},
		{id: 'crossedPlanes', title: 'пересекающиеся плоскости'},
		{id: 'parabolicCylinder', title: 'полу-цилиндр'},
		{id: 'hyperbolicCylinder', title: 'обратный цилиндр'},
		{id: 'cone', title: 'конус'},
		{id: 'sphere', title: 'СФЕРА ХУЛИ'},
		{id: 'sphere2', title: 'сфера'},
		{id: 'ellipsoid', title: 'эллипсод'},
		{id: 'oneLineHyperboloid', title: 'однополосный гиперболоид'},
		{id: 'hyperbolicParaboloid', title: 'чипса'},
		{id: 'ellipticParaboloid', title: 'параболоид эллиптический'},
		{id: 'twoLineEllipticParaboloid', title: 'параболоид гиперболический'},
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
		{id: 'showPolygons3', title: 'Polygons3'},
		{id: 'showPolygons4', title: 'Polygons4'}
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
            pointColor: 'red',
            edgeColor: '#c04d59',
            polygonColor: '#3b3b3b',
            // polygonColor: '#473f4d',
            width: 2,
            showPoints: true,
            showEdges: true,
            showPolygons3: true,
            showPolygons4: false,
            name: 'cube',
        });

        callbacks.render();
        // console.log(userFigs)
	}

	function changeFigure(num, subject, color, linewidth, name){
        userFigs[num].subject = subject || userFigs[num].subject;
        // userFigs[num].color = color;
        userFigs[num].pointColor = color.pointColor;
        userFigs[num].edgeColor = color.edgeColor;
        userFigs[num].polygonColor = color.polygonColor;
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
        if(detail.id === 'showPoints') { userFigs[num].showPoints = !userFigs[num].showPoints }
        else if(detail.id === 'showEdges') { userFigs[num].showEdges = !userFigs[num].showEdges }
       	else if(detail.id === 'showPolygons3' || detail.id === 'showPolygons4'){
        	let show3 = document.getElementById('showPolygons3');
        	let show4 = document.getElementById('showPolygons4');
        	if(detail.id === 'showPolygons3'){
        		userFigs[num].showPolygons3 = !userFigs[num].showPolygons3;
        		if(show3.checked){
        			// show3.disabled = true;
        			// show4.disabled = false;
        			show4.checked = false;
        			userFigs[num].showPolygons4 = false;
        		}
        	}
        	else { // detail.id == 'showPolygons4'
        		userFigs[num].showPolygons4 = !userFigs[num].showPolygons4;
        		if(show4.checked){
        			// show3.disabled = false;
        			// show4.disabled = true;
        			show3.checked = false;
        			userFigs[num].showPolygons3 = false;
        		}
        	}
       	}

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

			let pointColor = document.createElement('input');
			pointColor.setAttribute('placeholder', 'Point Color (default: red)');
			pointColor.addEventListener('keyup', ()=>{
				try{ changeFigure(figInputs.dataset.num, null, 
								  { pointColor: pointColor.value,
								  	edgeColor: edgeColor.value,
								  	polygonColor: polygonColor.value,
								  },
								  linewidth.value, name.value); }
				catch(e){console.log(e)};
			});
			figInputs.appendChild(pointColor);

			let edgeColor = document.createElement('input');
			edgeColor.setAttribute('placeholder', 'Edge Color (default: #c04d59)');
			edgeColor.addEventListener('keyup', ()=>{
				try{ changeFigure(figInputs.dataset.num, null, 
								  { pointColor: pointColor.value,
								  	edgeColor: edgeColor.value,
								  	polygonColor: polygonColor.value,
								  },
								  linewidth.value, name.value); }
				catch(e){console.log(e)};
			});
			figInputs.appendChild(edgeColor);

			let polygonColor = document.createElement('input');
			polygonColor.setAttribute('placeholder', 'Poly Color (default: #473f4d)');
			polygonColor.addEventListener('keyup', ()=>{
				try{ changeFigure(figInputs.dataset.num, null, 
								  { pointColor: pointColor.value,
								  	edgeColor: edgeColor.value,
								  	polygonColor: polygonColor.value,
								  },
								  linewidth.value, name.value); }
				catch(e){console.log(e)};
			});
			figInputs.appendChild(polygonColor);

			let linewidth = document.createElement('input');
			linewidth.setAttribute('placeholder', 'linewidth');
			linewidth.addEventListener('keyup', ()=>{
				try{ changeFigure(figInputs.dataset.num, null, 
								  { pointColor: pointColor.value,
								  	edgeColor: edgeColor.value,
								  	polygonColor: polygonColor.value,
								  },
								  linewidth.value, name.value); }
				catch(e){console.log(e)};
			});
			figInputs.appendChild(linewidth);			

			let name = document.createElement('input');
			name.setAttribute('placeholder', 'name');
			name.addEventListener('keyup', ()=>{
				try{ changeFigure(figInputs.dataset.num, null,
									{ pointColor: pointColor.value,
					  			  	  edgeColor: edgeColor.value,
									  polygonColor: polygonColor.value,
									},
									linewidth.value, name.value); }
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
				showDetail.checked = userFigs[figInputs.dataset.num][detail.id];
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
						 	{ pointColor: pointColor.value,
			  			  	  edgeColor: edgeColor.value,
							  polygonColor: polygonColor.value,
							},
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
import { useEffect, useRef } from 'react';
import Point from '../entities/Point'
import Canvas3DUI from './UI/Canvas3DUI'

function Canvas3D(props){

	const {num, win, width, height, userFigs} = props;
	let canvas = useRef(null);
	let context = useRef(null);
	let canMove = useRef(false);

	useEffect(()=>{
		canvas.current = document.getElementsByClassName('canvas3d')[num];
		context.current = canvas.current.getContext('2d');
		render(context.current);
	})

	function xs3dTo2d(point) { return point.x*(win.display.z-win.camera.z)/(point.z-win.camera.z);};
	function ys3dTo2d(point) { return point.y*(win.display.z-win.camera.z)/(point.z-win.camera.z);};
	// xs3dTo2d(point) { return (point.x*(win.camera.z-win.display.z))/(win.camera.z-point.z);};
	// ys3dTo2d(point) { return (point.y*(win.camera.z-win.display.z))/(win.camera.z-point.z);};

	function xs2dToCanvas(x) { return (x-win.left) * (width) / win.width };
	function ys2dToCanvas(y) { return (-y - win.bottom) * (height) / win.height };

	// function sx2dToCanvas(x) { return x * win.width / width};
	// function sy2dToCanvas(y) { return y * win.height / height};

	function clear(context){
		context.fillStyle = '#292929';
		context.fillRect(0,0, width, height);
	}

	function line(p1, p2, context, color, width){
		context.beginPath();
		context.strokeStyle = color || '#ff5c6c';
		context.lineWidth = width || 2;
		context.moveTo(xs2dToCanvas(xs3dTo2d(p1)), ys2dToCanvas(ys3dTo2d(p1)));
		context.lineTo(xs2dToCanvas(xs3dTo2d(p2)), ys2dToCanvas(ys3dTo2d(p2)));
		context.stroke();
	}

	// TODO
	function printOxyz(context){
		// +x
		line(new Point(0,0,0),
				  new Point(1.9*(win.left+win.width),0,0),
				  context, 'green', 3);
		// -x
		line(new Point(0,0,0),
				  new Point(1.9*win.left,0,0),
				  context, 'green', 3);

		// +y
		line(new Point(0,0,0),
				  new Point(0,1.9*(-win.bottom),0),
				  context, 'blue', 3);

		// -y
		line(new Point(0,0,0),
				  new Point(0,1.9*(-win.bottom-win.height),0),
				  context, 'blue', 3);

		// #TODO
		// +z
		// line(new Point(0,0,0), new Point(0,0,10), context, 'yellow', 3);
	}

	function printPoints(fig, context){
		let pointSize = 3;
		context.fillStyle = '#ff2626';
		fig.subject.points.forEach((el)=>{
			context.beginPath();
			context.arc(xs2dToCanvas(xs3dTo2d(el)), ys2dToCanvas(ys3dTo2d(el)), pointSize, 0, Math.PI*2, true);
			context.fill();
		});
	}
	
	function printEdges(fig, context){
		fig.subject.edges.forEach((el)=>{
			line(fig.subject.points[el.p1], fig.subject.points[el.p2],
				  	  context, fig.color, fig.width);
		});
	}

	// NOTE: polygon is triangle here 
	function printPolygon(fig, context){
		fig.subject.polygons.forEach((el)=>{
			context.beginPath();
			context.fillStyle = '#473f4d';
			context.globalAlpha = 0.7;
			context.moveTo(xs2dToCanvas(xs3dTo2d(fig.subject.points[el.p1])), ys2dToCanvas(ys3dTo2d(fig.subject.points[el.p1])));
			context.lineTo(xs2dToCanvas(xs3dTo2d(fig.subject.points[el.p2])), ys2dToCanvas(ys3dTo2d(fig.subject.points[el.p2])));
			context.lineTo(xs2dToCanvas(xs3dTo2d(fig.subject.points[el.p3])), ys2dToCanvas(ys3dTo2d(fig.subject.points[el.p3])));
			context.fill();
		});
	}

	function render(context){
		clear(context);
		// TODO
		printOxyz(context);

		userFigs.forEach((el)=>{
			if(el.isActive){
				if(el.showPoints) printPoints(el, context);
				if(el.showEdges) printEdges(el, context);
				if(el.showPolygons) printPolygon(el, context);
			}
		})
	}

    // ----- callbacks for UI
    function mouseD(){canMove.current = true};
    function mouseU(){canMove.current = false};
	function mouseM(ev){
 		if (canMove.current) {
            //TODO: be able to move Oxy
            // win.left -= sx2dToCanvas(ev.movementX);
            // win.bottom -= sy2dToCanvas(ev.movementY);

            // a = 3deg;
            const a = 3/57.295779513082;

	        // ----> X  counter clockwise
	        if(ev.movementY<0){
	            userFigs.forEach((el)=>{
	                if(el.isActive){
	                    el.subject.points.forEach(point=>{
	                        point.y = point.y*Math.cos(a) + point.z*Math.sin(a);
	                        point.z = -point.y*Math.sin(a) + point.z*Math.cos(a);
	                    });
	                };
	            });

	        };

            // ----> X  clockwise 
            if(ev.movementY>0){
                userFigs.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.y = point.y*Math.cos(a) - point.z*Math.sin(a);
                            point.z = point.y*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });
            };

            // ----> Y  counter clockwise
            if(ev.movementX<0){
                userFigs.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.x = point.x*Math.cos(a) - point.z*Math.sin(a);
                            point.z = point.x*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });
            };

            // ----> Y  clockwise
            if(ev.movementX>0){
                userFigs.forEach((el)=>{
                    if(el.isActive){
                        el.subject.points.forEach(point=>{
                            point.x = point.x*Math.cos(a) + point.z*Math.sin(a);
                            point.z = -point.x*Math.sin(a) + point.z*Math.cos(a);
                        });
                    };
                });
            };

            // TODO
            // ----> Z  counter clockwise
            //     point.x = point.x*Math.cos(a) - point.y*Math.sin(a);
            //     point.y = point.x*Math.sin(a) + point.y*Math.cos(a);

            // ----> Z  clockwise
            //     point.x = point.x*Math.cos(a) + point.y*Math.sin(a);
            //     point.y = -point.x*Math.sin(a) + point.y*Math.cos(a);
            render(context.current);
        };
	};
	function wheel(ev){
		if(ev.deltaY < 0){
            // win.width -= 2;
            // win.height -= 2;
            // win.left++;
            // win.bottom++;
            win.camera.z += 5;
        } else {
            if(win.camera.z <= win.display.z+5) return;
            win.camera.z -= 5;
            // win.width += 2;
            // win.height += 2;
            // win.left--;
            // win.bottom--;
        };

        render(context.current);
	};

	return(
		<div data-num = {num} style={{marginBottom: '15px'}}>
			<canvas 
				className = 'canvas3d'
				width = {width}
				height = {height}
				onWheel = {wheel}
				onMouseDown = {mouseD}
				onMouseUp = {mouseU}
				onMouseMove = {mouseM}
			></canvas>

			<Canvas3DUI
				num = {num}
				// stdFuncs = {stdFuncs}
                userFigs = {userFigs}
				callbacks = {{render: ()=>render(context.current)}}
    		></Canvas3DUI>
		</div>
	);
}

export default Canvas3D;
import { useEffect } from 'react';


function Canvas2D(props){

	const {win, width, height, stdFuncs, userFuncs, callbacks} = props;
	let canvas = null;
	let context = null;
	let activeFuncs = 0;
	let canMove = { can: false };

	useEffect(()=>{
		canvas = document.getElementById('canvas2d1');
		context = canvas.getContext('2d');


		canvas.addEventListener('wheel', (ev)=>callbacks.wheel(ev, render, context));
        canvas.addEventListener('mousedown', ()=>callbacks.mouseD(canMove));
        canvas.addEventListener('mouseup', ()=>callbacks.mouseU(canMove));
        canvas.addEventListener('mousemove', (ev)=>callbacks.mouseM(ev, canMove, sx, sy, render, context));
	})

	function xs(x) { return (x-win.left) * (width) / win.width };
	function ys(y) { return (-y - win.bottom) * (height) / win.height };
	function sx(x) { return x * win.width / width};
	function sy(y) { return y * win.height / height};

	function clear(context){
		context.fillStyle = '#292929';
		context.fillRect(0,0, width, height);
	};

	function line(x1,y1,x2,y2,color,width,context){
		context.beginPath();
		context.strokeStyle = color || '#ff5c6c';
		context.lineWidth = width || 2;
		context.moveTo(xs(x1), ys(y1));
		context.lineTo(xs(x2), ys(y2));
		context.stroke();
	};

	function printString(x, y, str, color, font = 'bold 10px sans-serif', context){
		context.font = font;
		context.fillStyle = color || 'white';
		context.fillText(str, xs(x), ys(y));
	};

	function printFunc(funcs, num, context){
		let dx = win.width/100;// условно на 100, чем больше тем точнее
		let x = 0;
		// +x
		while(x < win.left + win.width){
			line(x, funcs[num].f(x), x+dx, funcs[num].f(x+dx), funcs[num].color, funcs[num].width, context);
			x+=dx;
		};
		x = 0;
		// -x
		while(x > win.left){
			line(x, funcs[num].f(x), x-dx, funcs[num].f(x-dx), funcs[num].color, funcs[num].width, context);
			x-=dx;
		}
	};

	function printCells(context){
		// | | | | |
		for (let i = Math.round(win.left); i < Math.round(win.left + win.width); i++) {
			line(i, -win.bottom - win.height, i, -win.bottom, '#181a1b', 1, context);
		};
		// — — — — —
		for (let i = Math.round(-win.bottom - win.height); i < Math.round(-win.bottom); i++) {
			line(win.left, i, win.left + win.width, i, '#181a1b', 1, context);
		};
    };

	function printOxy(context){
		// +x
		line(0, 0, win.left+win.width, 0, '#fff', 2, context);
		// +y
		line(0, 0, 0, -win.bottom, '#fff', 2, context);
		// -x
		line(0, 0, win.left, 0, '#fff', 2, context);
		// -y
		line(0, 0, 0, -win.bottom-win.height , '#fff', 2, context);

		// x
		for (let i = Math.round(win.left); i < Math.round(win.left+win.width); i++){
			line(i, -0.4, i, 0.4, '#fff', 1, context);
			if(i!=0) printString(i+0.2, -0.7, i, '#bef4e1', undefined, context);
		};
		// y
		for (let i = Math.round(-win.bottom-win.height); i < Math.round(-win.bottom); i++){
			line(-0.4, i, 0.4, i, '#fff', 1, context);
			if(i!=0) printString(0.8, i-0.2, i, '#bef4e1', undefined, context);
		};
		// (0;0)
		printString(0.2, -0.6, '0', '#5ed18a', undefined, context);
		
		printString(win.left+win.width-1, -1.5, 'X', '#fff', undefined, context);
		printString(1.5, -win.bottom-1, 'Y', '#fff', undefined, context);

		// arrows
		// x
		line(win.left+win.width, 0, win.left+win.width-0.5, -0.5, 'white', 2, context);
		line(win.left+win.width, 0, win.left+win.width-0.5, 0.5, 'white', 2, context);
		// y
		line(0, -win.bottom, 0.5, -win.bottom-0.5, 'white', 2, context);
		line(0, -win.bottom, -0.5, -win.bottom-0.5, 'white', 2, context);
	};

	function render(context, isClear){
        clear(context);
        printCells(context);
        printOxy(context);
        if(isClear) {
            for(let i = 0; i < stdFuncs.length; i++){
                stdFuncs[i].isActive = false;
            };
            return;
        };

        activeFuncs = 0;
        for(let i = 0; i < stdFuncs.length; i++){
            if(stdFuncs[i].isActive){
            	activeFuncs++;
            	printFunc(stdFuncs, i, context);
        		printString(win.left, -win.bottom-win.height+sy(activeFuncs*15), stdFuncs[i].name, stdFuncs[i].color, '15px sans-serif', context);
            };
        };
        for(let i = 0; i < userFuncs.length; i++){
            if(userFuncs[i].isActive){
            	activeFuncs++;
            	printFunc(userFuncs, i, context);
            	printString(win.left, -win.bottom-win.height+sy(activeFuncs*15), userFuncs[i].name, userFuncs[i].color, '15px sans-serif', context);
            };

            // TODO ZEROES
            if(userFuncs[i].zeroes.have){
            	let x = callbacks.getZero(userFuncs[i].f, userFuncs[i].zeroes.a, userFuncs[i].zeroes.b);
            	if(x === null) continue; 
            	line(x, -win.bottom, x, -win.bottom-win.height, userFuncs[i].color, userFuncs[i].width, context);
            };
        };
    };

	return(
		<canvas
			id='canvas2d1'
			width={width}
			height={height}
		></canvas>);
}

export default Canvas2D;
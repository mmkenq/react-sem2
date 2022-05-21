import Graph2DUI from "./UI/Graph2DUI";
import Canvas2D from "./Canvas/Canvas2D";


function Graph2D(props){
	const {win, userFuncs, stdFuncs} = props;

    function wheel(ev, render, context){
        if(ev.deltaY < 0){
            if(win.width <= 5) return;
            win.width -= 2;
            win.height -= 2;
            win.left++;
            win.bottom++;
        } else {
            win.width += 2;
            win.height += 2;
            win.left--;
            win.bottom--;
        };
        render(context);
    };

    function mouseD(canMove){ canMove.can = true; };
    function mouseU(canMove){ canMove.can = false; };
    function mouseM(ev, canMove, sx, sy, render, context){
        if (canMove.can) {
            win.left -= sx(ev.movementX/2);
            win.bottom -= sy(ev.movementY/2);
            render(context);
        };
    };

    // ---------------------
    function getZero(f, a, b){
        var eps = 0.0001;
        if (f(a) * f(b) > 0) return null;
        if (Math.abs(f(a) - f(b)) <= eps) { return (a + b) / 2; };
        var half = (a + b) / 2;
        if (f(a) * f(half) <= 0) {
            return this.getZero(f, a, half, eps);
        };
        if (f(b) * f(half) <= 0) {
            return this.getZero(f, half, b, eps);
        };
    };
    // TODO: getZero(for all zeroes), getDerivative, delFunction

    function addFunction(num){
        // default params
        userFuncs[num] = {
            f: () => 1,
            name: null,
            color: null,
            width: 2,
            isActive: false,
            zeroes: {have: false, a: null, b: null},
        };
        // render();
    };

    function changeFunction(f, num, color, width, name){
        userFuncs[num].color = color || '#df8cff';
        userFuncs[num].width = width || 2;
        userFuncs[num].name = name;
        if(f){
            userFuncs[num].f = f;
            userFuncs[num].isActive = true;
        };
        //render();
    };

    // TODO: actually remove funcs from array
    // and reuse empty slots
    function delFunction(num){
        userFuncs[num].isActive = false;
        userFuncs[num].zeroes.have = false;
        // render();
        // console.log(userFuncs)
    };

    function printZeroes(num,a,b){
        userFuncs[num].zeroes.have = true;
        userFuncs[num].zeroes.a = Number(a);
        userFuncs[num].zeroes.b = Number(b);
        // render();
    };

    return(
    	<div>
    		<Canvas2D
    			// id = 'canvas2DBox'
    			win = {win}
    			width = {350}
    			height = {350}
				stdFuncs = {stdFuncs}
            	userFuncs = {userFuncs}
    			callbacks = {{wheel: wheel, mouseD: mouseD, mouseU: mouseU, mouseM: mouseM, getZero: getZero}}
    		></Canvas2D>

    		<Graph2DUI
				// id = 'ui2d'    			
	            stdFuncs = {stdFuncs}
				callbacks = {{
					// canvasRender: this.canvas.render.bind(null, canvas2d1.getContext('2d')),
                	addFunction: addFunction,
	            	changeFunction: changeFunction,
                	delFunction: delFunction,
                	printZeroes: printZeroes,
				}}
    		></Graph2DUI>
    	</div>
    );
}

export default Graph2D;
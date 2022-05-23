import Canvas2D from "./Canvas/Canvas2D";
// import _ from "lodash"
import './graph2d.css'

function Graph2D(props){
	const {win, stdFuncs} = props;

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

    
    return(
    	<div id="graph2d">
            <h1 style={{textAlign: 'left'}}>GRAPH 2D</h1>
    		<Canvas2D
                num = {0}
    			win = {JSON.parse(JSON.stringify(win))}
    			width = {350}
    			height = {350}
                // stdFuncs = {_.cloneDeep(stdFuncs)}
				stdFuncs = {stdFuncs.map(a => Object.assign({}, a))}
            	userFuncs = {[]}
                callbacks = {{getZero: getZero}}
    		></Canvas2D>
            <Canvas2D
                num = {1}
                win = {JSON.parse(JSON.stringify(win))}
                width = {350}
                height = {350}
                // stdFuncs = {_.cloneDeep(stdFuncs)}
                stdFuncs = {stdFuncs.map(a => Object.assign({}, a))}
                userFuncs = {[]}
                callbacks = {{getZero: getZero}}
            ></Canvas2D>
    	</div>
    );
}

export default Graph2D;
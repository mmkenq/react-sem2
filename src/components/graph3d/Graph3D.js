
import Canvas3D from "./Canvas/Canvas3D";
// import Cube from "./entities/figures/Cube"

function Graph3D(props){
    const {win} = props;

/* TODO: TORN AROUND MATRIX CALLBACKS HERE
   //TURN AROUND X MATRIX (COUNTERCLOCKWISE)
    const turnAroundX = new Matrix([
        [1,0,0],
        [0, Math.cos(a), -Math.sin(a)],
        [0, Math.sin(a), Math.cos(a)]
    ]);

    // TURN AROUND Y MATRIX (CLOCKWISE)
    const turnAroundY = new Matrix([
        [Math.cos(a), 0, Math.sin(a)],
        [0, 1, 0],
        [-Math.sin(a), 0, Math.cos(a)]
    ]);

    // TURN AROUND Z MATRIX (COUNTERCLOCKWISE)
    const turnAroundZ = new Matrix([
        [Math.cos(a), -Math.sin(a), 0],
        [Math.sin(a), Math.cos(a), 0],
        [0, 0, 1]
    ]);
*/

    return(
        <div id="graph3d">
            <h1 style={{textAlign: 'left'}}>GRAPH 3D</h1>
            <Canvas3D
                num = {0}
                win = {JSON.parse(JSON.stringify(win))}
                width = {350}
                height = {350}
                // stdFuncs = {{}}
                userFigs = {[
/*                    {
                        isActive: true,
                        subject: new Cube,
                        // center: new Point(0,0,0),
                        color: 'aqua',
                        width: 2,
                        showPoints: true,
                        showEdges: true,
                        showPolygons: true,
                        name: 'cube',
                    },*/
                ]}
                // callbacks = {{getZero: getZero}}
            ></Canvas3D>
            {/*<Canvas3D
                num = {1}
                win = {JSON.parse(JSON.stringify(win))}
                width = {350}
                height = {350}
                // stdFuncs = {_.cloneDeep(stdFuncs)}
                // stdFuncs = {stdFuncs.map(a => Object.assign({}, a))}
                userFigs = {[]}
                // callbacks = {{getZero: getZero}}
            ></Canvas3D>*/}
        </div>
    );
}

export default Graph3D
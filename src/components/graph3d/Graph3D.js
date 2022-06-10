
import Canvas3D from "./Canvas/Canvas3D";
// import Cube from "./entities/figures3/Cube"

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
    function calcDistance(fig, endPoint, name){//в классе фигура в классе сабжект добавить поле полигонс(массив)
        fig.subject.polygons.forEach(polygon => {
            const points = polygon.points;
            let x = 0, y = 0, z = 0;
            for (let i = 0; i < points.length; i++){
                x += fig.subject.points[points[i]].x;
                y += fig.subject.points[points[i]].y;
                z += fig.subject.points[points[i]].z;
            }
            x /= points.length;
            y /= points.length;
            z /= points.length;
            // fig.subject.polygons[i][name] = Math.sqrt(
            //     Math.pow(endPoint.x - x, 2) +
            //     Math.pow(endPoint.y - y, 2) +
            //     Math.pow(endPoint.z - z, 2)
            // );
            polygon[name] = Math.sqrt(
                Math.pow(endPoint.x - x, 2) +
                Math.pow(endPoint.y - y, 2) +
                Math.pow(endPoint.z - z, 2)
            );
            polygon.distance = Math.sqrt(
                Math.pow(win.camera.x - x, 2) + 
                Math.pow(win.camera.y - y, 2) +
                Math.pow(win.camera.z - z, 2));
            
        });
        
    }

    function calcIllumination(distance, lumen){
        const res = distance ? lumen / Math.pow(distance, 3) : 1;
        return res > 1 ? 1 : res;
    }

    function sortByArtist(fig){
        fig.subject.polygons.sort((a, b) => (a.distance < b.distance)? 1 : -1);
    }

    return(
        <div id="graph3d">
            <h1 style={{textAlign: 'left'}}>GRAPH 3D</h1>
            <Canvas3D
                num = {0}
                win = {JSON.parse(JSON.stringify(win))}
                width = {350}
                height = {350}
                // stdFuncs = {{}}
                userFigs = {[]}
                callbacks = {{
                    calcDistance: (fig, endPoint, name)=>calcDistance(fig, endPoint, name),
                    calcIllumination: (distance, lumen)=>calcIllumination(distance, lumen),
                    sortByArtist: (fig)=>sortByArtist(fig)
                }}
            ></Canvas3D>
            {/*<Canvas3D
                num = {1}
                win = {JSON.parse(JSON.stringify(win))}
                width = {350}
                height = {350}
                // stdFuncs = {_.cloneDeep(stdFuncs)}
                // stdFuncs = {stdFuncs.map(a => Object.assign({}, a))}
                userFigs = {[]}
                // callbacks = {}
            ></Canvas3D>*/}
        </div>
    );
}

export default Graph3D
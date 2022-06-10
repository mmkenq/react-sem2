import Point from '../Point'
import Edge from '../Edge'
import Polygon from '../Polygon3'


export default class HyperbolicParaboloid{
    constructor(center = new Point(0,0,0)){
        this.points = [];
        this.edges = [];
        this.polygons = [];
        this.polygonsR = [];

        let a = 2;
        let b = 2;
        let l = 6; // length


        // points
        for(let x=l; x>-l; x--){
            for(let y=l; y>-l; y--){
                let z = this.getZ(x,y,a,b);
                this.points.push(new Point(x,y,z));

            }
        }

        // edges
        for(let k=0; k<l*2; k++){
            for(let i=k*(l*2); i<(k+1)*(l*2)-1; i++){
                this.edges.push(new Edge(i, i+1))
            }
        }

        // polygons
        for(let k=0; k<l*2-1; k++){
            for(let i=k*(l*2); i<(k+1)*(l*2)-1; i++){
                this.polygons.push(new Polygon(i, i+1, l*2+i))
                this.polygons.push(new Polygon(i+1, l*2+i, l*2+i+1))
            }
        }


    }

    getZ(x,y,a,b){
        return ((x*x)/(a*a)-(y*y)/(b*b))/2;
    };


}
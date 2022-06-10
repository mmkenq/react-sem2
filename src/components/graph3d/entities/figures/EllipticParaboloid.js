import Point from '../Point'
import Edge from '../Edge'
import Polygon from '../Polygon3'


export default class EllipticParaboloid{
    constructor(center = new Point(0,0,0)){
        this.points = [];
        this.edges = [];
        this.polygons = [];
        this.polygonsR = [];

        let p = 3; // p > 0
        let q = 3; // q > 0
        let l = 6; // length

        // points
        for(let x=l; x>-l; x--){
            for(let y=l; y>-l; y--){
                let z = this.getZ(x,y,p,q);
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

    getZ(x,y,p,q){
        return ((x*x)/p+(y*y)/q)/2;
    };



}
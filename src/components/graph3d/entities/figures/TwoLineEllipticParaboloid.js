import Point from '../Point'
import Edge from '../Edge'
import Polygon from '../Polygon'


export default class TwoLineEllipticParaboloid{
    constructor(center = new Point(0,0,0)){
        this.points = [];
        this.edges = [];
        this.polygons = [];

        let p = 2; // p > 0
        let q = 2; // q > 0
        let l = 4; // length
        let d = 1; // расстояние между горшками = d*2


        let otherOctants = [];

        // points
        for(let x=l; x>=-l; x--){
            for(let y=l; y>=-l; y--){
                let z = this.getZ(x,y,p,q);
                this.points.push(new Point(x,y,z+d));
                otherOctants.push(new Point(x,y,-z-d));
            }
        }

        this.fillOctant(otherOctants);

        // edges
        for(let k=0; k<l*2*2+2; k++){
            for(let i=k*(l*2)+k; i<(k+1)*(l*2)+k; i++){
                this.edges.push(new Edge(i,i+1));
            }
        }

        // polygons
        for(let k=0; k<l*2; k++){
            for(let i=k*(l*2)+k; i<(k+1)*(l*2)+k; i++){
                this.polygons.push(new Polygon(i,i+1, i+l*2+1));
                this.polygons.push(new Polygon(i+l*2+2,i+1, i+l*2+1));
            }
        }

        for(let k=1; k<l*2+1; k++){
            for(let i=(l*2)*(l*2)+(k+1)*(l*2)+k; i<(l*2)*(l*2)+(k+2)*(l*2)+k; i++){
                this.polygons.push(new Polygon(i,i+1, i+l*2+1));
                this.polygons.push(new Polygon(i+l*2+2, i+1, i+l*2+1));
            }
        }

    }

    getZ(x,y,p,q){
        return ((x*x)/p+(y*y)/q)/2;
    }

    fillOctant(octPoints){
        this.points =  this.points.concat(octPoints);
    }

}
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


        let octant5 = [];
        let octant6 = [];
        let octant7 = [];
        let octant8 = [];

        // points
        for(let x=l; x>-l; x--){
            for(let y=l; y>-l; y--){
                let z = this.getZ(x,y,p,q);
                this.points.push(new Point(x,y,z+d));

                // octant5.push(new Point(x,y,-z-d));
                // octant6.push(new Point(-x,y,-z-d));
                // octant7.push(new Point(-x,-y,-z-d));
                octant8.push(new Point(x,-y,-z-d));
            }
        }

        // this.fillOctant(octant5);
        // this.fillOctant(octant6);
        // this.fillOctant(octant7);
        this.fillOctant(octant8);

        // edges
        for(let k=0; k<2*(l*2); k++){
            for(let i=k*(l*2); i<(k+1)*(l*2)-1; i++){
                this.edges.push(new Edge(i, i+1));
            }
        }

        // polygons
        for(let k=0; k<l*2-1; k++){
            for(let i=k*(l*2); i<(k+1)*(l*2)-1; i++){
                this.polygons.push(new Polygon(i, i+1, l*2+i));
                this.polygons.push(new Polygon(i+1, l*2+i, l*2+i+1));
            }
        }
        for(let k=l*2; k<2*(l*2)-1; k++){
            for(let i=k*(l*2); i<(k+1)*(l*2)-1; i++){
                this.polygons.push(new Polygon(i, i+1, l*2+i));
                this.polygons.push(new Polygon(i+1, l*2+i, l*2+i+1));
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
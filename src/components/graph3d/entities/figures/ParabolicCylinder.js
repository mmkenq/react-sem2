import Point from '../Point'
import Edge from '../Edge'
import Polygon from '../Polygon3'


export default class ParabolicCylinder{
    constructor(center = new Point(0,0,0)){
        this.points = [];
        this.edges = [];
        this.polygons = [];
        this.polygonsR = [];

        let p = 2; // p > 0
        let a = 4;

        // points
        for(let z = -a; z<a; z++){
            for(let y=-a; y<=a; y++){
                let x = this.getX(y,p);
                this.points.push(new Point(x,y,z));
            };
        };

        // edges
        for(let k=0; k<a*2; k++){
            for(let i=k*(this.points.length/(a*2)); i<(k+1)*(this.points.length/(a*2))-1; i++){
                this.edges.push(new Edge(i, i+1));
            }
        };

        // polygons
        for(let k=0; k<a*2-1; k++){
            for(let i=k*this.points.length/(a*2); i<(k+1)*(this.points.length/(a*2))-1; i++){
                this.polygons.push(new Polygon(i, i+1, i+this.points.length/(a*2)));
            }
        }

        for(let k=0; k<a*2-1; k++){
            for(let i=k*this.points.length/(a*2)+1; i<(k+1)*(this.points.length/(a*2)); i++){
                this.polygons.push(new Polygon(i, i+this.points.length/(a*2), i+this.points.length/(a*2)-1));
            }
        }
    }

    getX(y, p){
        return y*y/(2*p);
    }

}
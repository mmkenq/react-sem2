import Point from '../Point'
import Edge from '../Edge'
import Polygon from '../Polygon'


export default class HyperbolicCylinder{
    constructor(center = new Point(0,0,0)){
        this.points = [];
        this.edges = [];
        this.polygons = [];

        let p = 2; // p > 0
        let a = 3;
        let d = 1; // расстояние между 1 и 2 = 2*d

        // points
        for(let z = -a; z<a; z++){
            for(let y=-a; y<=a; y++){
                let x = this.getX(y,p);
                this.points.push(new Point(x+d,y,z));
            };
        };

        // edges
        for(let k=0; k<a*2*2; k++){
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

        // still polygons
        for(let k=0; k<a*2-1; k++){
            for(let i=k*this.points.length/(a*2)+1; i<(k+1)*(this.points.length/(a*2)); i++){
                this.polygons.push(new Polygon(i, i+this.points.length/(a*2), i+this.points.length/(a*2)-1));
            }
        }

        // points again
        this.points.forEach((point, i)=>{
            this.points.push(new Point(-point.x, point.y, point.z));
        });

        // polygons
        this.edges.forEach((edge, i)=>{
            if(edge.p1>this.edges.length/2+4*a){
                this.polygons.push(new Polygon(edge.p1, edge.p1+1, edge.p1-a*2));
                this.polygons.push(new Polygon(edge.p1, edge.p1-a*2, edge.p1-a*2-1));
            }
        })

    }

    getX(y, p){
        return y*y/(2*p);
    }

}
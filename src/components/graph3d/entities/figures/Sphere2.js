import Point from '../Point'
// import Edge from '../Edge'
// import Polygon from '../Polygon'


export default class Sphere2{
	constructor(center = new Point(0,0,0)){
		this.points = [];
	    this.edges = [];
	    this.polygons = [];
	    let R = 6; // radius
	    const c = 1.5; // closeness between points [0,R]


    	// let pointNum = this.points.length;
    	// for(let y=0; y<R; y+=c){
    	// 	for(let x=0; x<R; x+=c){
    	// 		let z = this.getZ(x,y,R);
    	// 		this.points[pointNum] = new Point(x,y,z);
    	// 		pointNum++;
    	// 	}
    	// }

    	let pointNum = this.points.length;
    	let octant2 = [];
    	let octant3 = [];
    	let octant4 = [];
    	let octant5 = [];
    	let octant6 = [];
    	let octant7 = [];
    	let octant8 = [];

    	for(let y=0; y<=R; y+=c){
    		for(let x=0; x<=R; x+=c){
    			let z = this.getZ(x,y,R);
    			this.points[pointNum] = new Point(x,y,z);

    			octant2.push(new Point(-x,y,z));
    			octant3.push(new Point(-x,-y,z));
    			octant4.push(new Point(x,-y,z));
    			octant5.push(new Point(x,y,-z));
    			octant6.push(new Point(-x,y,-z));
    			octant7.push(new Point(-x,-y,-z));
    			octant8.push(new Point(x,-y,-z));

    			pointNum++;
    		}
    	}

    	this.fillOctant(octant2);
    	this.fillOctant(octant3);
    	this.fillOctant(octant4);
    	this.fillOctant(octant5);
    	this.fillOctant(octant6);
    	this.fillOctant(octant7);
    	this.fillOctant(octant8);

	}

	getZ(x,y,r){
		// return Math.sqrt(Math.abs(r*r-x*x-y*y));
		return Math.sqrt(r*r-x*x-y*y);
	};

	fillOctant(octPoints){
		this.points =  this.points.concat(octPoints);
	};

}
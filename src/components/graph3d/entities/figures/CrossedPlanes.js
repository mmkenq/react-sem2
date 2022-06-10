import Point from '../Point'
import Edge from '../Edge'
import Polygon from '../Polygon3'


export default class CrossedPlanes{
	constructor(center = new Point(0,0,0)){
	    // стороны
		let a = 10; 
	    let b = 10; // h
	    
	    this.points = [
	    	new Point(-a/2, b/2, 0),
	    	new Point(a/2, b/2, 0),
	    	new Point(a/2, -b/2, 0),
	    	new Point(-a/2, -b/2, 0),

	    	new Point(0, b/2, a/2),
	    	new Point(0, b/2, -a/2),
	    	new Point(0, -b/2, -a/2),
	    	new Point(0, -b/2, a/2),
	    ];

	    this.edges = [
	    	new Edge(0,1),
	    	new Edge(1,2),
	    	new Edge(2,3),
	    	new Edge(3,0),

	    	new Edge(4,5),
	    	new Edge(5,6),
	    	new Edge(6,7),
	    	new Edge(7,4),
	    ];

	    this.polygons = [
	    	new Polygon(0,1,3),
	    	new Polygon(1,2,3),
	    	new Polygon(4,5,6),
	    	new Polygon(4,6,7),
	    ];

	    this.polygonsR = [];
	}
}
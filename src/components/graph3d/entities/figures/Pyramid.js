import Point from '../Point'
import Edge from '../Edge'
import Polygon from '../Polygon3'

export default class Pyramid{
	constructor(center = new Point(0,0,0)){
		this.points = [
			new Point(center.x+0,center.y+5,center.z+0), // 0
	    	new Point(center.x+5,center.y+0,center.z+-5), // 1
	    	new Point(center.x+5,center.y+0,center.z+5), // 2
	    	new Point(center.x+-5,center.y+0,center.z+5), // 3
	    	new Point(center.x+-5,center.y+0,center.z+-5), // 4
    		// new Point(0,0,0) // center
    	];

	    this.edges = [
			new Edge(0,1),
	        new Edge(0,2),
	        new Edge(0,3),
	        new Edge(0,4),

	        new Edge(1,2),
	        new Edge(2,3),
	        new Edge(3,4),
	        new Edge(4,1),
        ];
        
	    this.polygons = [
	    	new Polygon(0,1,2),
	        new Polygon(0,2,3),
	        new Polygon(0,3,4),
	        new Polygon(0,4,1),

	        new Polygon(1,2,3),
	        new Polygon(1,3,4),
	    ];

	    this.polygonsR = [];
	}
}
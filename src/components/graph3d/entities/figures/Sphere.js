import Point from '../Point'
import Edge from '../Edge'
import Polygon from '../Polygon3'

export default class Sphere{
	constructor(center = new Point(0,0,0)){
		const rad=57.295779513082;
		const u=45;

		this.points = [
	    	new Point(center.x+0,center.y+6,center.z+0),  // 0
	    	new Point(center.x+0,center.y+-6,center.z+0), // 1
	    	new Point(center.x+-6,center.y+0,center.z+0), // 2
	    	new Point(center.x+6,center.y+0,center.z+0),  // 3
	    	new Point(center.x+0,center.y+0,center.z+6),  // 4
	    	new Point(center.x+0,center.y+0,center.z+-6), // 5
	    	new Point(center.x+-Math.cos(u/rad)*6,center.y+Math.sin(u/rad)*6,center.z+0), // 6
	    	new Point(center.x+0,center.y+Math.cos(u/rad)*6,-Math.cos(u/rad)*6), // 7
	    	new Point(center.x+Math.cos(u/rad)*6,center.y+Math.cos(u/rad)*6,center.z+0),  // 8
	    	new Point(center.x+0,center.y+Math.cos(u/rad)*6,center.z+Math.cos(u/rad)*6),  // 9
	    	new Point(center.x+Math.cos(u/rad)*6,center.y+-Math.cos(u/rad)*6,center.z+0), // 10
	    	new Point(center.x+0,center.y+-Math.cos(u/rad)*6,center.z+Math.cos(u/rad)*6), // 11
	    	new Point(center.x+-Math.cos(u/rad)*6,center.y+-Math.cos(u/rad)*6,center.z+0), // 12
	    	new Point(center.x+0,center.y+-Math.cos(u/rad)*6,center.z+-Math.cos(u/rad)*6), // 13
    	];

	    this.edges = [
			new Edge(0,6),
	    	new Edge(0,7),
	    	new Edge(0,8),
	    	new Edge(0,9),
	    	new Edge(6,2),
	    	new Edge(7,5),
	    	new Edge(8,3),
	    	new Edge(9,4),

	    	new Edge(2,4),
	    	new Edge(4,3),
	    	new Edge(3,5),
	    	new Edge(5,2),

	    	new Edge(1,10),
	    	new Edge(1,11),
	    	new Edge(1,12),
	    	new Edge(1,13),
	    	new Edge(10,3),
	    	new Edge(11,4),
	    	new Edge(12,2),
	    	new Edge(13,5),
        ];
        
	    this.polygons = [
	    	new Polygon(0,6,7),
	    	new Polygon(0,7,8),
	    	new Polygon(0,6,9),
	    	new Polygon(0,8,9),
	    	new Polygon(7,8,5),
	    	new Polygon(5,8,3),
	    	new Polygon(3,8,9),
	    	new Polygon(4,6,9),
	    	new Polygon(2,4,6),
	    	new Polygon(2,6,7),
	    	new Polygon(3,4,9),
	    	new Polygon(2,5,7),

			new Polygon(1,10,11),
			new Polygon(1,10,13),
			new Polygon(1,11,12),
			new Polygon(1,12,13),

			new Polygon(2,4,12),
			new Polygon(3,10,11),
			new Polygon(3,11,4),
			new Polygon(11,4,12),

			new Polygon(3,5,10),
			new Polygon(2,5,13),
			new Polygon(2,13,12),
			new Polygon(5,10,13),

	    ];
	    
	    this.polygonsR = [];
	}
}
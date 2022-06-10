import Point from '../Point'
import Edge from '../Edge'

// polygon - triangle
import Polygon from '../Polygon3'

// polygon - rectangle
import PolygonR from '../Polygon4'


export default class Cube{
	constructor(x = 0, y = 0, z = 0, size = 10){
    	this.points = [
	        new Point(x - size/2, y - size/2, z - size/2), // 0
	        new Point(x + size/2, y - size/2, z - size/2), // 1
	        new Point(x + size/2, y + size/2, z - size/2), // 2
	        new Point(x - size/2, y + size/2, z - size/2), // 3
	        new Point(x - size/2, y - size/2, z + size/2), // 4
	        new Point(x + size/2, y - size/2, z + size/2), // 5
	        new Point(x + size/2, y + size/2, z + size/2), // 6
	        new Point(x - size/2, y + size/2, z + size/2), // 7
   		];
		this.edges = [
			new Edge(0, 1),
			new Edge(0, 3),
			new Edge(0, 4),
			new Edge(2, 3),
			new Edge(2, 6),
			new Edge(2, 1),
			new Edge(5, 1),
			new Edge(5, 4),
			new Edge(5, 6),
			new Edge(7, 6),
			new Edge(7, 4),
			new Edge(7, 3),
		];
		this.polygons = [
	        new Polygon([0, 1, 2, 3], "#473f4d"),
        	new Polygon([0, 4, 5, 1], "#473f4d"),
        	new Polygon([2, 3, 7, 6], "#473f4d"),
        	new Polygon([1, 2, 6, 5], "#473f4d"),
        	new Polygon([0, 4, 7, 3], "#473f4d"),
        	new Polygon([4, 7, 6, 5], "#473f4d"),
    	];

	    this.polygonsR = [];
	}

}
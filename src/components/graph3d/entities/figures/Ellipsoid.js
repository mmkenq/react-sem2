import Point from '../Point'
// import Edge from '../Edge'
// import Polygon from '../Polygon'


export default class Ellipsoid{
	constructor(center = new Point(0,0,0)){
		this.points = [];
	    this.edges = [];
	    this.polygons = [];
	    let R = 4; // diameter
	    let a = 4;
	    let b = 4;
	    let c = 4;

	    let pointsX = this.goX(-R, R);
	    // let pointsY = this.goY(-R, R);

	    let pointNum = 0;
	    for(let i=-R; i<=R; i++){
			this.points[i] = new Point(pointsX[pointNum][0],
									   0,
									   this.getZ(pointsX[pointNum][0], 0, a,b,c));

			// console.log(this.getZ(pointsX[pointNum][0], 0, a,b,c))			
			pointNum++;
	    }
	}

	getZ(x,y, a, b, c){
		let A = -c/a;
		let B = -c/b;
		let C = c;
		// return (A*x*x+B*y*y+C)>=0 ? Math.sqrt(A*x*x+B*y*y+C) : -Math.sqrt((A*x*x+B*y*y+C));
		return Math.sqrt(Math.abs(A*x*x+B*y*y+C));
	};

	goX(a, b){
		let points = [];
		let d = Math.abs(b-a);
		let r = d/2;

		for(let i=0; i<=d; i++) points[i] = [i-r, 0];	

		return points;
	}

	goY(a, b){
		let points = [];
		let d = Math.abs(b-a);
		let r = d/2;

		for(let i=0; i<=d; i++) points[i+this.points.length] = [0, i-r];	

		return points;	
	}

}
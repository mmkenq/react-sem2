import Point from '../Point'
import Edge from '../Edge'
import Polygon from '../Polygon'


export default class oneLineHyperBoloid{
	constructor(center = new Point(0,0,0)){
		this.points = [];
	    this.edges = [];
	    this.polygons = [];

	    const rad = 57.295779513082;
	    // радиус крайних окружностей
	    // (он же высота, т.е расстояние между этими окружностями)
	    const R = 5;
		let a = 0; // угол
		let delta = 30; // плотность точек

		let x = 0;
		let y = 0;
		let z = 0;

		let r = R; // changing radius
		for(let znext = -R; znext <= R; znext++){
			for(let i = 0; i<360/delta; i++){
				x = r*Math.cos(a/rad);
				y = r*Math.sin(a/rad);
				this.points.push(new Point(x,y,znext));
				a += delta;
			};
			znext < 0 ? r-=0.5 : r+= 0.5
		};

		// диагонали (от 1 окружности до другой через Ox)
		for(let i = 0; i<this.points.length-360/delta; i++){
			this.edges.push(new Edge(i, i+360/delta));
		};

		// дальняя окружность
		for(let i = 1; i<360/delta; i++){
			this.edges.push(new Edge(i, i-1));
		};
		this.edges.push(new Edge(0, 360/delta-1));

		// ближняя окружность
		for(let i = this.points.length-1; i>this.points.length-360/delta; i--){
			this.edges.push(new Edge(i, i-1));
		};
		this.edges.push(new Edge(this.points.length-1, this.points.length-360/delta));

		// дальние polygons
		for(let i = 0; i<360/delta-2; i++){
			this.polygons.push(new Polygon(i+2, i+1, i+this.points.length/2-5));
			this.polygons.push(new Polygon(i+this.points.length/2-4, i+2, i+this.points.length/2-5));
		}
		this.polygons.push(new Polygon(0, 1, this.points.length/2-360/delta/2));
		this.polygons.push(new Polygon(this.points.length/2-360/delta/2+1, 1, this.points.length/2-360/delta/2));
		this.polygons.push(new Polygon(0, 360/delta-1, this.points.length/2-360/delta/2));
		this.polygons.push(new Polygon(this.points.length/2-360/delta/2+360/delta-1, 360/delta-1, this.points.length/2-360/delta/2));


		// ближние polygons
		// for(let i = 1; i<360/delta; i++){
		// 	this.polygons.push(new Polygon(this.points.length-i, this.points.length-i-1, this.points.length/2))
		// }
		// this.polygons.push(new Polygon(this.points.length-1, this.points.length-360/delta, this.points.length/2));
	}
}
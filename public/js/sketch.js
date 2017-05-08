var vertices = []; // list to keep track of created nodes
var numVertices = 0; 
var radius = 20; 
var pressedVertex1 = -1; 
var pressedVertex2 = -1;
var edges = [];
var weight = 10; 



function setup(){
	createCanvas(windowWidth,windowHeight-160); 
}

function draw(){
	background(200);
	
	stroke(0);
	for ( var edge = 0; edge < edges.length;edge++){
		edges[edge].displayEdge();	
	}

	noStroke();
	fill(100);
	for ( var vertex = 0; vertex < vertices.length; vertex++){
		vertices[vertex].displayVertex();
	}
}

function mousePressed(){
	//draw an edge between two vertices
	// check if you're pressing on an existing vertex
	for ( var vertex = 0; vertex < vertices.length; vertex ++){
		if (vertexPressed(vertices[vertex])){
			console.log("vertex %d has been pressed", vertex);
			
			if ((pressedVertex2 == -1 && pressedVertex1 == -1) || 
				(pressedVertex2 != -1 && pressedVertex1 != -1)) {
				pressedVertex1 = vertices[vertex]; // select first vertex
				pressedVertex2 = -1;
			}
			else if (vertices[vertex] == pressedVertex1) { // deselect
				pressedVertex1 = -1; pressedVertex2 = -1; 
			} 
			else if (vertices[vertex] == pressedVertex1) {
				pressedVertex2 = -1;
			}
			else if (pressedVertex2 == -1) {
				pressedVertex2 = vertices[vertex];
				// create edge
				for (var edge = 0; edge < edges.length; edge++){
					if ((edges[edge].vertex1.x == pressedVertex1.location.x && 
						edges[edge].vertex1.y == pressedVertex1.location.y &&
						edges[edge].vertex2.x == pressedVertex2.location.x &&
						edges[edge].vertex2.y == pressedVertex2.location.y) ||
						(edges[edge].vertex1.x == pressedVertex2.location.x && 
						edges[edge].vertex1.y == pressedVertex2.location.y &&
						edges[edge].vertex2.x == pressedVertex1.location.x &&
						edges[edge].vertex2.y == pressedVertex1.location.y)) { // edge exists
						console.log("edge exists");
						return; 
					}
				}
				var newEdge = new Edge(edges.length,pressedVertex1,pressedVertex2,weight);
				edges.push(newEdge);				
				console.log("edges, %d",edges.length); 
			} 
			return;
		} 
	}


	// create new vertex on mouse press
	var newVertex = new Vertex(numVertices, 'x');
	vertices.push(newVertex);
	console.log(" new vertex %d %c",numVertices);
	console.log(vertices[numVertices].name);
	numVertices++; 

	pressedVertex1 = -1; pressedVertex2 = -1; 

}

// function Vertex(number){
// 	this.name = number;
// 	this.radius = radius;
// 	this.location = createVector(mouseX, mouseY);	
// }

// function Vertex(id, name) {
//     this.id = id;
//     this.name = name;
//     this.radius = radius;
//     this.location = createVector(mouseX, mouseY); 
// }

Vertex.prototype.displayVertex = function(){
	ellipseMode(CENTER);
	push();
	if (this == pressedVertex1 || this == pressedVertex2) fill(0,0,200); 
	ellipse(this.location.x,this.location.y,this.radius*2,this.radius*2);
	fill(100);
	pop();
}

function vertexPressed(vertex){
	var d = dist(mouseX, mouseY, vertex.location.x, vertex.location.y);
    if (d < vertex.radius*(3/2)) {
    	return true;
    }
}

function Edge(number,vertex1,vertex2,weight){
	//console.log("in Astro");	
	//console.log(numAstros);
	this.name = number;
	this.vertex1 = createVector(vertex1.location.x,vertex1.location.y);
	this.vertex2 = createVector(vertex2.location.x,vertex2.location.y);
    this.weight = weight;

	console.log("create an edge");
}

Edge.prototype.displayEdge = function(){
	ellipseMode(CENTER);
	push();
	console.log(this.weight );
	text(this.weight,(this.vertex1.x+this.vertex2.x)/2,(this.vertex1.y+this.vertex2.y)/2);
	line(this.vertex1.x,this.vertex1.y,this.vertex2.x,this.vertex2.y);
	pop();
}

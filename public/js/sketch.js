var vertices = []; // list to keep track of created nodes
var numVertices = 0; 
var radius = 20; 
var pressedVertex1 = -1; 
var pressedVertex2 = -1;
var edges = [];
var weight = 10;
var mouseWasPressed = false; 
var letterASCIIcode = 65; // A - first character, then iterates with every character
var egdeSelected;


function setup(){
    createCanvas(windowWidth,windowHeight-160); 
    textAlign(CENTER,CENTER);
    textSize(16);
    textFont("Comfortaa");
}

function draw(){
    background(200);
    
    stroke(175);
    for ( var edge = 0; edge < edges.length;edge++){
        edges[edge].displayEdge();  
    }

    noStroke();
    fill(150);
    for ( var vertex = 0; vertex < vertices.length; vertex++){
        vertices[vertex].displayVertex();
    }
}

function mousePressed(){
    //draw an edge between two vertices
    // check if you're pressing on an existing vertex
    for ( var vertex = 0; vertex < vertices.length; vertex ++){
        if (vertexPressed(vertices[vertex])){
            //console.log("vertex %d has been pressed", vertex);
            
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
                    if ((edges[edge].source.x == pressedVertex1.location.x && 
                        edges[edge].source.y == pressedVertex1.location.y &&
                        edges[edge].destination.x == pressedVertex2.location.x &&
                        edges[edge].destination.y == pressedVertex2.location.y) ||
                        (edges[edge].source.x == pressedVertex2.location.x && 
                        edges[edge].source.y == pressedVertex2.location.y &&
                        edges[edge].destination.x == pressedVertex1.location.x &&
                        edges[edge].destination.y == pressedVertex1.location.y)) { // edge exists
                        //console.log("edge selected..?");
                        //var hey = edges[edge].getEdgeFromDestinationAndSource();
                        //console.log('edge', getEdgeFromDestinationAndSource());
                        mouseWasPressed = true;
                        return egdeSelected = edges[edge];
                    }
                }
                if (mouseWasPressed) return;
                mouseWasPressed = true;
                var newEdge = new Edge(edges.length,pressedVertex1,pressedVertex2,weight);
                edges.push(newEdge);
                //console.log('in mouse pressed',edges);
                // var hey = newEdge.getEdgeFromDestinationAndSource();             
                //console.log("edges, %d",edges.length); 
                // console.log('edge', hey);
                return egdeSelected = edges[edge];
            } 
            mouseWasPressed = false;
            return;
        } 
    }


    // create new vertex on mouse press
    var newVertex = new Vertex(numVertices, String.fromCharCode(letterASCIIcode+numVertices));
    vertices.push(newVertex);
    //console.log(" new vertex %d %c",numVertices);
    //console.log(vertices[numVertices].name);
    numVertices++; 

    pressedVertex1 = -1; pressedVertex2 = -1; 

}

function keyPressed() {
    console.log('in pressed');
    if (keyCode == ENTER){
        console.log("ENTER");
        pressedVertex1 = -1; pressedVertex2 = -1;
    } else if (pressedVertex1 == -1 || pressedVertex2 == -1){
        //console.log("do nothing");
    } else {
        // console.log(key);
        if (mouseWasPressed) {
            if (keyCode == 32 || keyCode == TAB){
                // if space is the key pressesed do nothing
                return;
            } else if (key >= 0 && key <= 9){
                egdeSelected.weight = egdeSelected.weight + '' + key;
            // } else if (key == 43 || key == 47 || key == 42 || key == 45 || key == 94){ 
            //  // tried to implement operators, but couldn't figure it out
            //  // ASCII key --> +:43 - /:47 - *:42 - -:45 - 94:^
            //  console.log('operator pressed', key);
            //  egdeSelected.weight = egdeSelected.weight + '' + key;
            } else if ((keyCode == DELETE || keyCode == BACKSPACE)) {
                if (egdeSelected.weight >= 0 && egdeSelected.weight <= 9) egdeSelected.weight = 0;
                else egdeSelected.weight = parseInt(egdeSelected.weight.toString().slice(0,-1));
                stopPropagation();
                window.event.returnValue=false;
            }
        }
    }
}


function windowResized(){
    resizeCanvas(windowWidth,windowHeight-160);
    console.log("test");
}

/* ALGORITHM CODE */ 

/**
 * Created by Peter on 4/30/17.
 */


/*
 * Algorithm class
 */
function DijkstraAlgorithm(graph) {    
    this.nodes = graph.getVertexes();
    this.edges = graph.getEdges();
    this.settledNodes = [];
    this.unSettledNodes = [];
    this.predecessors = {};
    this.distance = {};
}

DijkstraAlgorithm.prototype.execute = function(source) {
    this.distance[source] = 0;
    this.unSettledNodes.push(source);

    while (this.unSettledNodes.length > 0) {
        var node = this.getMinimum(this.unSettledNodes);
        this.settledNodes.push(node);
        var index = this.unSettledNodes.indexOf(node);
        if (index >= 0) {
            this.unSettledNodes.splice(node, 1);
        }
        this.findMinimalDistances(node);
    }
};

DijkstraAlgorithm.prototype.findMinimalDistances = function(node) {
    var adjacentNodes = this.getNeighbors(node);

    for (var i = 0; i < adjacentNodes.length; i++) {
        var target = adjacentNodes[i];
        if (this.getShortestDistance(target) > this.getShortestDistance(node) + this.getDistance(node, target)) {
            this.distance[target] = this.getShortestDistance(node) + this.getDistance(node, target);
            this.unSettledNodes.push(target);
        }
    }
};

DijkstraAlgorithm.prototype.getDistance = function(node, target) {
    for (var i = 0 ;i < this.edges.length; i++) {
        var edge = edges[i];
        if (edge.getSource().equals(node) && edge.getDestination().equals(target)) {
            return edge.getWeight();
        }
    }

    // throw new RuntimeException("Should not happen");
};

DijkstraAlgorithm.prototype.getNeighbors = function(node) {
    var neighbors = [];

    for (var i = 0 ;i < this.edges.length; i++) {
        var edge = edges[i];
        if (edge.getSource().equals(node) && !isSettled(edge.getDestination())) {
            neighbors.push(edge.getDestination());
        }
    }

    return neighbors;
};

DijkstraAlgorithm.prototype.getMinimum = function(vertexes) {
    var minimum = null;

    for (var i = 0; i < vertexes.length; i++) {
        var vertex = vertexes[i];
        if (minimum === null) {
            minimum = vertex;
        }
        else {
            if (this.getShortestDistance(vertex) < this.getShortestDistance(minimum)) {
                minimum = vertex;
            }
        }
    }

    return minimum;
};

DijkstraAlgorithm.prototype.isSettled = function(vertex) {
    return this.settledNodes.contains(vertex);
};

DijkstraAlgorithm.prototype.getShortestDistance = function(destination) {
    var d = this.distance.indexOf(destination);
    if (d === -1) {
        return Number.MAX_VALUE;
    } else {
        return d;
    }
};

/*
 * This method returns the path from the source to the selected target and
 * NULL if no path exists
 */
DijkstraAlgorithm.prototype.getPath = function(target) {
    var path = [];
    var step = target;
    // check if a path exists
    if (this.predecessors.indexOf(step) === -1) {
        return null;
    }
    path.push(step);
    while (this.predecessors.indexOf(step) !== -1) {
        step = this.predecessors(this.predecessors.indexOf(step));
        path.push(step);
    }
    // Put it into the correct order
    path.reverse();
    return path;
};


/*
 * Graph class
 */
function Graph(vertexes, edges) {
    this.vertexes = vertexes;
    this.edges = edges;
}

Graph.prototype.getVertexes = function() {
    return this.vertexes;
};

Graph.prototype.getEdges = function() {
    return this.edges;
};


/*
 * Vertex class
 */
function Vertex(id, name) {
    this.id = id;
    this.name = name;
    this.radius = radius;
    this.location = createVector(mouseX, mouseY); 
}

function vertexPressed(vertex){
    var d = dist(mouseX, mouseY, vertex.location.x, vertex.location.y);
    if (d < vertex.radius*(3/2)) {
        return true;
    }
}

Vertex.prototype.getId = function() {
    return this.id;
};

Vertex.prototype.getName = function() {
    return this.name;
};

Vertex.prototype.displayVertex = function(){
    ellipseMode(CENTER);
    push();
    if (this == pressedVertex1 || this == pressedVertex2) fill(100,150,230); 
    else (150);
    ellipse(this.location.x,this.location.y,this.radius*2,this.radius*2);
    fill(255,90);
    text(this.name,this.location.x,this.location.y);
    pop();
}


/*Vertex.prototype.hashCode = function() {
    var prime = 31;
    var result = 1;
    result = prime * result + ((id == null) ? 0 : id.hashCode());
    return result;
};*/

Vertex.prototype.equals = function(obj) {
    if (this === obj) return true;
    if (obj === null) return false;
    if (!(this instanceof Vertex && obj instanceof Vertex)) return false;
    var other = obj;
    if (this.id === null) {
        if (other.id !== null) {
            return false;
        }
    }
    else if (!this.id.equals(other.id)) {
        return false;
    }
    return true;
};

Vertex.prototype.toString = function() {
    return this.name;
};


/*
 * Edge class
 */


function Edge(id, source, destination, weight) {

    this.id = id;
    
    if (mouseWasPressed) {
        this.source = createVector(source.location.x,source.location.y);
        this.destination = createVector(destination.location.x,destination.location.y); 
    } else {
        this.source = new Vertex();
        this.destination = new Vertex();
    }
    this.weight = weight;
}


Edge.prototype.displayEdge = function(){
    ellipseMode(CENTER);
    push();
    //console.log(this.weight);
    line(this.source.x,this.source.y,this.destination.x,this.destination.y);
    push();
      rotate(atan2(this.destination.y-this.source.y-radius, this.destination.x-this.source.x-radius));
      translate(this.destination.x, this.destination.y);
      triangle(0, 0, -10, 5, -10, -5);
    pop();

    fill(50);
    text(this.weight,(this.source.x+this.destination.x)/2,(this.source.y+this.destination.y)/2);
    pop();
};

Edge.prototype.getId = function() {
    return this.id;
};

Edge.prototype.getDestination = function() {
    return this.destination;
};

Edge.prototype.getSource = function() {
    return this.source;
};

// Edge.prototype.getEdgeFromDestinationAndSource = function(){
//  var edge;
//  for (edge = 0; edge <= edges.length-1; edge++){

//          console.log(edges[edge].source, pressedVertex1.location);
//      if (edges[edge].source.x == pressedVertex1.location.x && 
//          edges[edge].source.y == pressedVertex1.location.y &&
//          edges[edge].destination.x == pressedVertex2.location.x &&
//          edges[edge].destination.y == pressedVertex2.location.y) {
//          return egdeSelected = edges[edge];

//      } else if (edges[edge].source.x == pressedVertex2.location.x && 
//          edges[edge].source.y == pressedVertex2.location.y &&
//          edges[edge].destination.x == pressedVertex2.location.x &&
//          edges[edge].destination.y == pressedVertex2.location.y){
//          return egdeSelected = edges[edge];
//      } else {
//          return 5;
//      }
//  }
// };

Edge.prototype.getWeight = function() {
    return this.weight;
};

Edge.prototype.toString = function() {
    return this.source + " " + this.destination;
};




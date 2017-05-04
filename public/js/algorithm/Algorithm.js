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
}

Vertex.prototype.getId = function() {
    return this.id;
};

Vertex.prototype.getName = function() {
    return this.name;
};

/*Vertex.prototype.hashCode = function() {
    final int prime = 31;
    int result = 1;
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
    this.source = new Vertex();
    this.destination = new Vertex();
    this.weight = weight;
}


Edge.prototype.getId = function() {
    return this.id;
};

Edge.prototype.getDestination = function() {
    return this.destination;
};

Edge.prototype.getSource = function() {
    return this.source;
};

Edge.prototype.getWeight = function() {
    return this.weight;
};

Edge.prototype.toString = function() {
    return this.source + " " + this.destination;
};
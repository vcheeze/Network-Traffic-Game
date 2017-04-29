/**
 * Created by Peter on 4/30/17.
 */


// import Edge;
// import Vertex;
// import Graph;

function DijkstraAlgorithm() {
    this.nodes, this.edges, this.settledNodes, this.unSettledNodes, this.predecessors, this.distance;
}

DijkstraAlgorithm.prototype.execute = function(source) {
    this.settledNodes = [];
    this.unSettledNodes = [];
    this.distance[source] = 0;
    this.predecessors = {};
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
        if (minimum == null) {
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
    if (d == -1) {
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
    if (this.predecessors.indexOf(step) == -1) {
        return null;
    }
    path.push(step);
    while (this.predecessors.indexOf(step) != -1) {
        step = this.predecessors(this.predecessors.indexOf(step));
        path.push(step);
    }
    // Put it into the correct order
    path.reverse();
    return path;
};

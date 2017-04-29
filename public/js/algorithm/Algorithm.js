/**
 * Created by Peter on 4/30/17.
 */

// import java.util.ArrayList;
// import java.util.Collections;
// import java.util.HashMap;
// import java.util.HashSet;
// import java.util.LinkedList;
// import java.util.List;
// import java.util.Map;
// import java.util.Set;

// import Edge;
// import Vertex;
// import Graph;

function DijkstraAlgorithm() {

    this.nodes, this.edges, this.settledNodes, this.unSettledNodes, this.predecessors, this.distance;
    // private final List<Vertex> nodes;
    // private final List<Edge> edges;
    // private Set<Vertex> settledNodes;
    // private Set<Vertex> unSettledNodes;
    // private Map<Vertex, Vertex> predecessors;
    // private Map<Vertex, Integer> distance;
}

DijkstraAlgorithm.prototype.execute = function(source) {
    this.settledNodes = [];
    this.unSettledNodes = [];
    this.distance = { source: 0 };
    this.predecessors = [];
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
}

DijkstraAlgorithm.prototype.findMinimalDistances = function(Vertex node) {
    List<Vertex> adjacentNodes = getNeighbors(node);
    for (Vertex target : adjacentNodes) {
        if (getShortestDistance(target) > getShortestDistance(node) + getDistance(node, target)) {
            distance.put(target, getShortestDistance(node) + getDistance(node, target));
            predecessors.put(target, node);
            unSettledNodes.add(target);
        }
    }
}

DijkstraAlgorithm.prototype.getDistance = function(Vertex node, Vertex target) {
    for (Edge edge : edges) {
        if (edge.getSource().equals(node) && edge.getDestination().equals(target)) {
            return edge.getWeight();
        }
    }
    throw new RuntimeException("Should not happen");
}

DijkstraAlgorithm.prototype.getNeighbors = function(Vertex node) {
    List<Vertex> neighbors = new ArrayList<Vertex>();
    for (Edge edge : edges) {
        if (edge.getSource().equals(node)
            && !isSettled(edge.getDestination())) {
            neighbors.add(edge.getDestination());
        }
    }
    return neighbors;
}

DijkstraAlgorithm.prototype.getMinimum = function(Set<Vertex> vertexes) {
    Vertex minimum = null;
    for (Vertex vertex : vertexes) {
        if (minimum == null) {
            minimum = vertex;
        } else {
            if (getShortestDistance(vertex) < getShortestDistance(minimum)) {
                minimum = vertex;
            }
        }
    }
    return minimum;
}

DijkstraAlgorithm.prototype.isSettled = function(Vertex vertex) {
    return settledNodes.contains(vertex);
}

DijkstraAlgorithm.prototype.getShortestDistance = function(Vertex destination) {
    Integer d = distance.get(destination);
    if (d == null) {
        return Integer.MAX_VALUE;
    } else {
        return d;
    }
}

/*
 * This method returns the path from the source to the selected target and
 * NULL if no path exists
 */
DijkstraAlgorithm.prototype.getPath = function(Vertex target) {
    LinkedList<Vertex> path = new LinkedList<Vertex>();
    Vertex step = target;
    // check if a path exists
    if (predecessors.get(step) == null) {
        return null;
    }
    path.add(step);
    while (predecessors.get(step) != null) {
        step = predecessors.get(step);
        path.add(step);
    }
    // Put it into the correct order
    Collections.reverse(path);
    return path;
}

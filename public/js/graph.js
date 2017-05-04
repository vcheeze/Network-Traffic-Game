/**
 * Created by vcheeze on 5/4/17.
 */
var scenario = 1;
var total, x, y, vertexes, edges;
switch (scenario) {
    /*========== Scenario 1 ==========*/
    case 1:
        total = 1000;
        x = 500, y = total - x;

        vertexes = [
            new Vertex('0', 'a'),
            new Vertex('1', 'b'),
            new Vertex('2', 'c'),
            new Vertex('3', 'd')
        ];

        edges = [
            new Edge('0', vertexes[0], vertexes[2], x/100),
            new Edge('1', vertexes[0], vertexes[3], 12),
            new Edge('2', vertexes[2], vertexes[1], 12),
            new Edge('3', vertexes[3], vertexes[1], y/100)
        ];

        var graph1 = new Graph(vertexes, edges);
        break;
    /*========== Scenario 2 ==========*/
    case 2:
        total = 80;
        x = 40, y = total - x;

        vertexes = [
            new Vertex('0', 'a'),
            new Vertex('1', 'b'),
            new Vertex('2', 'c'),
            new Vertex('3', 'd')
        ];

        edges = [
            new Edge('0', vertexes[0], vertexes[2], 60),
            new Edge('1', vertexes[0], vertexes[3], 10 + y),
            new Edge('2', vertexes[2], vertexes[1], 10 + x),
            new Edge('3', vertexes[3], vertexes[1], 60)
        ];

        var graph1 = new Graph(vertexes, edges);
        break;
    default:
        console.log("No Scenario selected");
}

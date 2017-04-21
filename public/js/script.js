$(function() {
	var cy = cytoscape({
		container: $('#cy'),

		elements: [ // list of graph elements to start with
		    { // node a
		      data: { id: 'a' }
		    },
		    { // node b
		      data: { id: 'b' }
		    },
		    { // node c
		      data: { id: 'c' }
		    },
		    { // node d
		      data: { id: 'd' }
		    },
		    { // node e
		      data: { id: 'e' }
		    },
		    { // edge ab
		      data: { id: 'ab', source: 'a', target: 'b' }
		    },
		    { // edge ae
		      data: { id: 'ae', source: 'a', target: 'e' }
		    },
		    { // edge bc
		      data: { id: 'bc', source: 'b', target: 'c' }
		    },
		    { // edge be
		      data: { id: 'be', source: 'b', target: 'e' }
		    },
		    { // edge cd
		      data: { id: 'cd', source: 'c', target: 'd' }
		    },
		    { // edge ce
		      data: { id: 'ce', source: 'c', target: 'e' }
		    },
		    { // edge de
		      data: { id: 'de', source: 'd', target: 'e' }
		    }
	  	],

	  	style: cytoscape.stylesheet().selector('node').css({
	  		'content': 'data(id)'
	  	}).selector('edge').css({
	  		'target-arrow-shape': 'triangle',
	  		'width': 4,
	  		'line-color': '#ddd',
	  		'target-arrow-color': '#ddd',
	  		'curve-style': 'bezier'
	  	}).selector('.highlighted').css({
	  		'background-color': '#61bffc',
	  		'line-color': '#61bffc',
	  		'target-arrow-color': '#61bffc',
	  		'transition-property': 'background-color, line-color, target-arrow-color',
	  		'transition-duration': '0.5s'
	  	}),

	  	layout: {
		    name: 'breadthfirst',
		    directed: true,
		    roots: '#a',
		    padding: 10
	  	}
	});

	var bfs = cy.elements().bfs('#a', function(){}, true);
	var i = 0;
	var highlightNext = function() {
		if (i < bfs.path.length) {
			bfs.path[i].addClass('highlighted');
			i++;
			setTimeout(highlightNext, 1000);
		}
	};
	highlightNext();
});
	
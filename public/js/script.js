$(function() {
	var count = 0;
	var cy = cytoscape({
		container: $('#cy'),

		/*elements: [ // list of graph elements to start with
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
	  	],*/

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
		    name: 'preset'
		    /*directed: true,
		    roots: '#a',
		    padding: 10*/
	  	}
	});

	// mouse click event
	cy.on('click', 'node', function(e) {
		var node = e.target;
		console.log('clicked ' + node.id());
	});

	// mouseover event
	cy.on('mouseover', 'node', function(e) {
		var node = e.target;
		node.style({
			'background-color': '#333'
		});
	});

	// mouseout event
	cy.on('mouseout', 'node', function(e) {
		var node = e.target;
		node.style({
			'background-color': '#999'
		});
	});


	$('#cy').click(function(e) {
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		// console.log(x + ' ' + y);
		if (count === 0) {
			cy.add({
				group: 'nodes',
				data: { id: 'a' },
				position: {x: mouseX, y: mouseY}
			});
		}
		else if (count === 1) {
			cy.add({
				group: 'nodes',
				data: { id: 'b' },
				position: {x: mouseX, y: mouseY}
			});
		}
		else if (count === 2) {
			cy.add({
				group: 'nodes',
				data: { id: 'c' },
				position: {x: mouseX, y: mouseY}
			});
		}
		else if (count === 3) {
			cy.add({
				group: 'nodes',
				data: { id: 'd' },
				position: {x: mouseX, y: mouseY}
			});
		}
		else if (count === 4) {
			cy.add({
				group: 'nodes',
				data: { id: 'e' },
				position: {x: mouseX, y: mouseY}
			});
		}
		else if (count === 5) {
			cy.add({
				group: 'nodes',
				data: { id: 'f' },
				position: {x: mouseX, y: mouseY}
			});
		}
		count++;
	});

	const Nodes = {
		A: 1,
		B: 2,
		C: 3,
		D: 4,
		E: 5,
		F: 6,
		G: 7,
		H: 8,
		I: 9,
		J: 10,
		K: 11,
		L: 12,
		M: 13,
		N: 14,
		O: 15,
		P: 16,
		Q: 17,
		R: 18,
		S: 19,
		T: 20,
		U: 21,
		V: 22,
		W: 23,
		X: 24,
		Y: 25,
		Z: 26
	}
});

function init() {
	
    var width = 500;
	var height = 300;
	var padding = 20;
	var dataset = [
	[5, 20],
	[500, 90],
	[250, 50],
	[100, 33],
	[330, 95],
	[410, 12],
	[475, 44],
	[25, 67],
	[85, 21],
	[220, 88],
	[600, 20],
	[700, 100],
	];
	
	var xScale = d3.scaleLinear()
	               .domain([d3.min(dataset, function(d) {
				   return d[0];
				   }),
				   d3.max(dataset, function(d) {
				   return d[0];
				   })])
				   .range([padding, width - padding * 2 ]);
				   
	var yScale = d3.scaleLinear()
	               .domain([d3.min(dataset, function(d) {
				   return d[1];
				   }),
				   d3.max(dataset, function(d) {
				   return d[1];
				   })])	
				   .range([ height - padding , padding]);
				   
   var svg = d3.select('#scatterPlot')
	            .append("svg")
				.attr("width", width)
				.attr("height", height);
				   
    var xAxis = d3.axisBottom()
	              .ticks(5)
	              .scale(xScale);
				  
	var yAxis = d3.axisLeft()
	              .ticks(5)
	              .scale(yScale);
				   
	
				
	svg.selectAll("circle")
	.data(dataset)
	.enter()
	.append("circle")
	
	.attr("cx", function(d, i) {
	return xScale(d[0]);
	})
	.attr("cy", function(d) {
	return yScale(d[1]);
	})
	.attr("r", function(d) {
	return Math.sqrt(height - d[1]);
	})
	.attr("fill", function(d, i) {
     if (i == 6) {
     return "red";
     }
     return "orange";
     });
	
	svg.selectAll("text")
	.data(dataset)
	.enter()
	.append("text")
	
	.text(function(d) {
	return d[0] + "," +d[1];
	})
	
	.attr("x", function(d) {
	return xScale(d[0]) + 10;
	})
	.attr("y", function(d) {
	return yScale(d[1]);
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.attr("fill", "black");
	
	svg.append("g")
	   .attr("class", "axis")
	   .attr("transform", "translate(0, "+ (height - padding) +")")
	   .call(xAxis);
	   
	svg.append("g")
	   .attr("class", "axis")
	   .attr("transform", "translate(" + padding + ",0)")
	   .call(yAxis);
	
}
window.onload = init;
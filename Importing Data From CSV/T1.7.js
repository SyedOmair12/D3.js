function init() {
	    var width = 500;
	    var height = 100;
		var barPadding = 1;
	    var dataset;
	d3.csv("data.csv", function(data, error){
		 	
    if (error) {  
        console.log(error);
    } 
         
		dataset = data;
		console.log(dataset);
                barChart(dataset);
		
  });
  
	function barChart() {
		var svg = d3.select("#chart")
		.append("svg")
		.attr("width", width)
		.attr("height", height);
		
		svg.selectAll("rect")
		   .data(dataset)
		   .enter()
		   .append("rect")
		   
		   .attr("x", function(d, i) {
			   return i * (width / dataset.length);
		   })
		   .attr("y", function(d) {
			   return height - (d.Test * 4);
		   })
		   .attr("width", width / dataset.length - barPadding)
		   .attr("height", function(d) {
			   return d.Test * 4;
		   })
		   .attr("fill", function(z){
	       return "rgb(0, 0, " + Math.round(z.Test * 20) + ")";});
	
	svg.selectAll("text")
	.data(dataset)
	.enter()
	.append("text")
	
	.text(function(d) {
	return d.Test;
	})
	
	.attr("x", function(d, i) {
	return i * (width / dataset.length) + 5;
	})
	.attr("y", function(d) {
	return height - (d.Test * 4) + 15;
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.attr("fill", "yellow");
	}
}
window.onload = init;
function init() {

    var width = 500;
	var height = 100;
	var barPadding = 1;
	var maxValue = 25;
	var dataset = [14, 5, 26, 23, 9, 21, 7, 19, 29, 5];

	// add
	d3.select("#add")
	   .on("click", function() {
	  
	var newNumber = Math.floor(Math.random() * maxValue);
	dataset.push(newNumber);
	

	
	xScale.domain(d3.range(dataset.length));
	 
	var bars = svg.selectAll("rect")
	    .data(dataset)
		.attr("fill", "slategrey")

		
		
		
		bars.enter()
		    .append("rect")
			.attr("x",width)
			.on("mouseover", function(d) {
			d3.select(this)
			.attr("fill", "orange");
			
			    var xPosition = parseFloat(d3.select(this).attr("x"))
				var yPosition = parseFloat(d3.select(this).attr("y"))
				
				svg.append("text")
				.attr("id", "tooltip")
				.attr("x", xPosition + parseFloat(d3.select(this).attr("width"))/2-10)
				.attr("y", yPosition + 20)
				.text(d);
				})
			
			.on("mouseout", function(d) {
				d3.select(this)
				.transition()
				.duration(250)
				.attr("fill", "rgb(0,0, " + (d * 10) + ")");
			d3.select("#tooltip").remove();
			})
		
		
			.attr("y",function(d) {
				return height - yScale(d);
			})
			.merge(bars)
			.transition()
			.duration(500)
			.attr("x", function(d,i) {
				return xScale(i)
			})
			.attr("y", function(d) {
				return height-yScale(d);
			})
			.attr("width", xScale.bandwidth())
			.attr("height", function(d) {
				return yScale(d);
			});
			
 	svg.selectAll("rect")
	.data(dataset)
	.transition()
	.delay(function(d,i) {
		return i * 100;
	})
	.duration(2000)
	.ease(d3.easeLinear)

	
	
	.attr("x", function(d,i) {
	return xScale(i) + xScale.bandwidth() /2;
	})
	.attr("y", function(a){
	return height - yScale(a) + 14;
	})
	.attr("width", xScale.bandwidth())
	.attr("height", function(b) {
	return yScale(b);
	})
	.attr("fill", function(z){
	return "rgb(0, 0, " + Math.round(z * 10) + ")";});
	
	svg.selectAll("text")
	.data(dataset)
	.transition()
	.duration(3000)
	
	.text(function(d) {
	return d;
	})
	
	.attr("x", function(d, i) {
	return xScale(i) +	 xScale.bandwidth() / 2 ;
	})
	.attr("y", function(d) {
	return height - yScale(d) + 14;
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.attr("fill", "red"); 
	   
	   });
	   

	// remove
	d3.select("#remove")
	   .on("click", function() {
	  
	dataset.shift();
	

	
	xScale.domain(d3.range(dataset.length));
	 
	var bars = svg.selectAll("rect")
	    .data(dataset)
		
		bars.exit()
			.transition()
			.duration(500)
			.attr("x", width)
			.remove()
			
		bars.transition()
		    .delay(500)
			.attr("x", function(d,i) {
				return xScale(i)
			})
			.attr("y", function(d) {
				return height-yScale(d);
			})
			.attr("width", xScale.bandwidth())
			.attr("height", function(d) {
				return yScale(d);
			});
			
 	svg.selectAll("rect")
	.data(dataset)
	.transition()
	.delay(function(d,i) {
		return i * 100;
	})
	.duration(2000)
	.ease(d3.easeLinear)
	
	
	
	.attr("x", function(d,i) {
	return xScale(i) + xScale.bandwidth() /2;
	})
	.attr("y", function(a){
	return height - yScale(a) + 14;
	})
	.attr("width", xScale.bandwidth())
	.attr("height", function(b) {
	return yScale(b);
	})
	.attr("fill", function(z){
	return "rgb(0, 0, " + Math.round(z * 10) + ")";});
	
	svg.selectAll("text")
	.data(dataset)
	.transition()
	.duration(3000)
	
	.text(function(d) {
	return d;
	})
	
	.attr("x", function(d, i) {
	return xScale(i) +	 xScale.bandwidth() / 2 ;
	})
	.attr("y", function(d) {
	return height - yScale(d) + 14;
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.attr("fill", "red"); 
	   
	   });
	   
	  //sort
	  d3.select("#sort")
	   .on("click", function() {
		   sortBars();
		  
	   });
	 var sortOrder = false;
	 
	 var sortBars = function() {
		 sortOrder = !		sortOrder;
		 
		 svg.selectAll("rect")
		 .sort(function(a,b) {
			 if (sortOrder) {
			 return d3.ascending(a,b);
			 }
			 else {
				 return d3.descending(a,b);
			 }
		 })
		 .transition()
		 	.delay(function(d,i) {
		return i * 100;
	})
	.duration(2000)
	.ease(d3.easeLinear)
	
		 .attr("x", function(d,i) {
			 return xScale(i);
		 });
	 };
		 
	   
	
	var xScale = d3.scaleBand()
	               .domain(d3.range(dataset.length))	
				   .rangeRound([0,width])
				   .paddingInner(0,0.5);
				   
	var yScale = d3.scaleLinear()
	                .domain([0,d3.max(dataset)])
					.range([0, height]);
	
	var svg = d3.select("p")
	            .append("svg")
				.attr("width", width)
				.attr("height", height);
				
				
	svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
			.on("mouseover", function(d) {
			d3.select(this)
			.attr("fill", "orange")
			
			    
				
			.on("mouseout", function(d) {
				d3.select(this)
				.transition()
				.duration(250)
				.attr("fill", "rgb(0,0, " + (d * 10) + ")");
			d3.select("#tooltip").remove();
			})
				
		})
	
	.attr("x", function(d,i) {
	return xScale(i);
	})
	.attr("y", function(a){
	return height - yScale(a);
	})
	.attr("width", xScale.bandwidth())
	.attr("height", function(b) {
	return yScale(b);
	})
	.attr("fill", function(z){
	return "rgb(0, 0, " + Math.round(z * 20) + ")";});
	
	svg.selectAll("text")
	.data(dataset)
	.enter()
	.append("text")
	
	.text(function(d) {
	return d;
	})
	
	.attr("x", function(d, i) {
	return xScale(i) +	 5	 ;
	})
	.attr("y", function(d) {
	return height - yScale(d) * 0.85;
	})
	.attr("font-family", "sans-serif")
	.attr("font-size", "12px")
	.attr("fill", "white");
	

}
window.onload = init;
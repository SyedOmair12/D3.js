function init() {
	
	 var width = 500;
	 var height = 300;
	 
	var color = d3.scaleQuantize()
	.range(["rgb(237, 248, 233)", "rgb(186, 228, 179)", "rgb(116,196,118)", "rgb(49,163,84)", "rgb(0,109,44)"]);

	 
	 
	 var projection = d3.geoMercator()
	 .center([145, -36.5])
	 .translate([width/2, height/2])
	 .scale([3000]);
	 
	 var path = d3.geoPath()
	 .projection(projection);
	 
	 var svg = d3.select("#geo")
	            .append("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("fill", "orange");
				
		d3.csv("VIC_LGA_unemployment.csv", function(data) {
		   color.domain([
            d3.min(data, function(d) { return d.unemployed; }), 
            d3.max(data, function(d) { return d.unemployed; })
        ]);
		 
				
      d3.json("LGA_VIC.json", function(json) {

				
					for (var x = 0; x < data.length; x++) {
				

						var dataLGA = data[x].LGA;
						
						var dataValue = parseFloat(data[x].unemployed);

						for (var n = 0; n < json.features.length; n++) {
						
							var jsonLGA = json.features[n].properties.LGA_name;
				
							if (dataLGA == jsonLGA) {
						
								json.features[n].properties.value = dataValue;

								break;
							}
						}		
					}
				
				svg.selectAll("path")
					   .data(json.features)
					   .enter()
					   .append("path")
					   .attr("d", path)
					   .style("fill", function(d) {
					   		
					   		var value = d.properties.value;
					   		
					   		if (value) {
								
					   			
						   		return color(value);
					   		} else {
								
					   			
						   		return "#ccc";
					   		}
					   });
			
	
			
		d3.csv("VIC_city.csv", function(data) {
			
		
		svg.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("cx", function(d) {
			return projection([d.lon, d.lat])[0];
		})
		.attr("cy", function(d) {
		return projection([d.lon, d.lat])[1];
		})
		.attr("r", 5)
		.style("fill", "yellow")
		.style("opacity", 1);
		
		              });
          });				
      });
	  
	  }
	  
	 	


window.onload = init;
// get the data from shiny with Shiny.addCustomMessageHandler
// 'phonedata' is what we have specified in server and it must match here

Shiny.addCustomMessageHandler("phonedata",d3jschart);
function d3jschart(d3data){
	
	// to store the data
	var worldphonesdata = d3data;
	
	console.log(worldphonesdata);
	
	// to remove previous chart
	d3.selectAll("svg").remove();
	
	// decide the margin
	var margin = {top: 50, right: 50, bottom: 50, left: 50},
	w = 850 - margin.left - margin.right,
	h = 550 - margin.top - margin.bottom;
	
	// create svg element and provide height and weight attributes
	var svg = d3.select("#D3Plot")
		.append("svg")
		.attr("width", w + margin.left + margin.right)
		.attr("height", h + margin.top + margin.bottom);
		
	// convert string to integer
	worldphonesdata.forEach(function(k) {
            k.Country = parseInt(k.Country);
    });		

	// scale the data
	var xscale = d3.scaleBand().domain(worldphonesdata.map(function(d,i){return d.Year})).range([0, w+20]);
				
	var yscale = d3.scaleLinear().domain([0, d3.max(worldphonesdata, function(d) { return d.Country;})]).range([h,0]);
	
	// manually set the colors
	var colorScale = d3.scaleOrdinal()
				.domain(worldphonesdata.map(function(d,i){return d.Year}))
				.range(["red","lightblue","lightgreen","grey","Yellow","salmon","brown"]);
	
	/*
	// automatically set the colors
	var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
	*/
	
	
	// tool tip
	var tooltip = d3.select("body").append("div").attr("class", "toolTip");
  
	// create bar chart				
	svg.selectAll("rect")
		.data(worldphonesdata)
		.enter().append("rect")
		.attr("class","rect")
		.attr("transform","translate(" + margin.left + "," + margin.top + ")")
		.attr("height", function(d,i) {return h - yscale(d.Country)})
        .attr("width","100")
		.attr("x", function(d,i) {return (i * 110)})
		.attr("y",function(d,i) {return yscale(d.Country)})
		.attr("fill", function (d,i){ return colorScale(d.Year); })
		.on("mousemove", function(d) {
			tooltip
              .style("left", d3.event.pageX-50 + "px")
              .style("top", d3.event.pageY - 25 + "px")
              .style("display", "inline-block")
              .html(d.Country);
		})
		.on("mouseout", function(d) {
			tooltip
			.style("display", "none");
		});

		
	// label of bars on top
	svg.selectAll("text")
		.data(worldphonesdata)
		.enter().append("text")
		.text(function(d) {return d.Country*1000;})
			.attr("x", function(d, i) {return (i * 110) + margin.left + 20})
			.attr("y", margin.top);

			
	// title of the chart		
	svg.append("text")
		.attr("transform", "translate(" + (margin.left + margin.right + w/4) + "," + (margin.top-30) + ")")
		.attr("font-size", "24px")
		.text("Telephone By Region")
		
		
	// define x and y axis
	var xAxis =  d3.axisBottom()
					.scale(xscale);

	
	var yAxis =  d3.axisLeft()
					.scale(yscale);
	
	// show the axis on chart
	svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + (h+margin.top) + ")")
		.call(xAxis);
	
	svg.append("g")
		.attr("transform", "translate(" + (margin.left) + "," + margin.top + ")")
		.call(yAxis);
	
						
};
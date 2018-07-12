//to get the data from shiny 

Shiny.addCustomMessageHandler("phonedata",d3jschart);
function d3jschart(d3data){
	
	// to store the data
	var worldphonesdata = d3data;
	
	console.log(worldphonesdata);
	
	// to remove previous chart
	d3.selectAll("svg").remove();
	
	// convert the data to numeric
	worldphonesdata.forEach(function(n){
            n.Country = parseInt(n.Country);
    });		
	
	// decide the margin
	var margin = {top: 50, right: 50, bottom: 50, left: 50},
	w = 1700 - margin.left - margin.right,
	h = 550 - margin.top - margin.bottom;
	
	// create svg element and provide height and weight attributes
	var svg = d3.select("#D3Plot")
		.append("svg")
		.attr("width", w + margin.left + margin.right)
		.attr("height", h + margin.top + margin.bottom);
	
	// define scale here we have used range -90 to 90 to draw the needle on -90 to 90 degree
	var yScale = d3.scaleLinear().domain([0, d3.max(worldphonesdata, function(d) { return d.Country;})]).range([-90,90]);
	
	// tooltip
	var tooltip = d3.select("body").append("div").attr("class", "toolTip");
	
	// color gradient
	var gradient = svg.append("defs")
	  .append("linearGradient")
		.attr("id", "gradient")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "100%")
		.attr("y2", "0%");

	gradient.append("stop")
		.attr("offset", "0%")
		.attr("stop-color", "#0c0")
		.attr("stop-opacity", 1);

	gradient.append("stop")
		.attr("offset", "100%")
		.attr("stop-color", "#c00")
		.attr("stop-opacity", 1);
	
	// to draw arc or gauge path element of svg is used, hence we have used path
	svg.selectAll("path")
		.data(worldphonesdata)
		.enter().append("path")
		.attr("id","arc")
		.attr("d",function(d,i) {
					if(i===0) {return ("M "+(i*100)+" 300 A 100 100 0 0 1 "+((i*100)+200)+" 300 L "+((i*100)+150)+" 300 A 50 50 0 0 0 "+((i*100)+50)+" 300 L "+(i*100)+" 300 Z")}
					if(i===1) {return ("M "+((i*100)+150)+" 300 A 100 100 0 0 1 "+((i*100)+350)+" 300 L "+((i*100)+300)+" 300 A 50 50 0 0 0 "+((i*100)+200)+" 300 L "+((i*100)+150)+" 300 Z")}
					if(i===2) {return ("M "+((i*100)+300)+" 300 A 100 100 0 0 1 "+((i*100)+500)+" 300 L "+((i*100)+450)+" 300 A 50 50 0 0 0 "+((i*100)+350)+" 300 L "+((i*100)+300)+" 300 Z")}
					if(i===3) {return ("M "+((i*100)+450)+" 300 A 100 100 0 0 1 "+((i*100)+650)+" 300 L "+((i*100)+600)+" 300 A 50 50 0 0 0 "+((i*100)+500)+" 300 L "+((i*100)+450)+" 300 Z")}
					if(i===4) {return ("M "+((i*100)+600)+" 300 A 100 100 0 0 1 "+((i*100)+800)+" 300 L "+((i*100)+750)+" 300 A 50 50 0 0 0 "+((i*100)+650)+" 300 L "+((i*100)+600)+" 300 Z")}
					if(i===5) {return ("M "+((i*100)+750)+" 300 A 100 100 0 0 1 "+((i*100)+950)+" 300 L "+((i*100)+900)+" 300 A 50 50 0 0 0 "+((i*100)+800)+" 300 L "+((i*100)+750)+" 300 Z")}
					if(i===6) {return ("M "+((i*100)+900)+" 300 A 100 100 0 0 1 "+((i*100)+1100)+" 300 L "+((i*100)+1050)+" 300 A 50 50 0 0 0 "+((i*100)+950)+" 300 L "+((i*100)+900)+" 300 Z")}
		})
		.style("fill", "url(#gradient)")
		.style("stroke","url(#gradient)")
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
		
	
	// draw gauge chart
	svg.selectAll("path1")
		.data(worldphonesdata)
		.enter().append("path")
		.attr("id","needle")
		.attr("d",function(d,i){if(i===0) {return("M "+((i*100)+100)+" 250 L "+(95)+" 300 A 10 10 0 0 0 "+(105)+" 300 Z")} 
							else if(i===1){return("M "+((i*100)+250)+" 250 L "+(345)+" 300 A 10 10 0 0 0 "+(355)+" 300 Z")}
							else if(i===2){return("M "+((i*100)+400)+" 250 L "+(595)+" 300 A 10 10 0 0 0 "+(605)+" 300 Z")}
							else if(i===3){return("M "+((i*100)+550)+" 250 L "+(845)+" 300 A 10 10 0 0 0 "+(855)+" 300 Z")}
							else if(i===4){return("M "+((i*100)+700)+" 250 L "+(1095)+" 300 A 10 10 0 0 0 "+(1105)+" 300 Z")}
							else if(i===5){return("M "+((i*100)+850)+" 250 L "+(1345)+" 300 A 10 10 0 0 0 "+(1355)+" 300 Z")}
							else if(i===6){return("M "+((i*100)+1000)+" 250 L "+(1595)+" 300 A 10 10 0 0 0 "+(1605)+" 300 Z")}						
		})
		
		.style("fill","yellow")
		.style("stroke","green")
		.attr("transform",function(d,i) {
							if(i===0)
								{return "rotate("+yScale(d.Country)+" "+((i*100)+100)+" "+300+")"}
							if(i===1)
								{return "rotate("+yScale(d.Country)+" "+((i*100)+250)+" "+300+")"}
							if(i===2)
								{return "rotate("+yScale(d.Country)+" "+((i*100)+400)+" "+300+")"}
							if(i===3)
								{return "rotate("+yScale(d.Country)+" "+((i*100)+550)+" "+300+")"}
							if(i===4)
								{return "rotate("+yScale(d.Country)+" "+((i*100)+700)+" "+300+")"}
							if(i===5)
								{return "rotate("+yScale(d.Country)+" "+((i*100)+850)+" "+300+")"}
							if(i===6)
								{return "rotate("+yScale(d.Country)+" "+((i*100)+1000)+" "+300+")"}
		});
	
	// text of the data		
	svg.selectAll("text")
		.data(worldphonesdata)
		.enter().append("text")
		.text(function(d) {return d.Country*1000;})
			.attr("x", function(d, i) {return (i * 110) + margin.left + 20})
			.attr("y", margin.top);
			
};
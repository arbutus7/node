// Set the dimensions of the canvas / graph
//	width = 600 - margin.left - margin.right,
//	height = 270 - margin.top - margin.bottom;
//var margin = { top: 30, right: 700, bottom: 50, left: 50 },
//  outerWidth = 1250,
//  outerHeight = 500,
//  width = outerWidth - margin.left - margin.right,
//  height = outerHeight - margin.top - margin.bottom;

function handleFileSelect2(evt) {
  var filename2 = evt.target.files[0];
  console.log(filename2.name);

  var	margin = {top: 30, right: 20, bottom: 20, left: 250},
    //width = 300,
    //height = 280;

    	width = 600 - margin.left - margin.right,
    	height = 270 - margin.top - margin.bottom;
  // Parse the date / time
  var	parseDate = d3.time.format("%d-%b-%y").parse;

  // Set the ranges
  var	x = d3.time.scale().range([0, width]);
  var	y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var	xAxis = d3.svg.axis().scale(x)
  	.orient("bottom").ticks(5);

  var	yAxis = d3.svg.axis().scale(y)
  	.orient("left").ticks(5);

  // Define the line
  var	valueline = d3.svg.line()
  	.x(function(d) { return x(d.date); })
  	.y(function(d) { return y(d.close); });

// Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
  // Adds the svg canvas
  var	svg = d3.select("body")
  	.append("svg")
  		.attr("width", width + margin.left + margin.right)
  		.attr("height", height + margin.top + margin.bottom)
  	.append("g")
  		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  d3.csv(filename2.name, function(error, data) {
  	data.forEach(function(d) {
  		d.date = parseDate(d.date);
  		d.close = +d.close;
  	});

  	// Scale the range of the data
  	x.domain(d3.extent(data, function(d) { return d.date; }));
  	y.domain([0, d3.max(data, function(d) { return d.close; })]);

  	// Add the valueline path.
  	svg.append("path")
  		.attr("class", "line")
  		.attr("d", valueline(data));

    // Add the scatterplot
    svg.selectAll("dot")	
        .data(data)			
    .enter().append("circle")								
        .attr("r", 2)
        .attr("cx", function(d) { return x(d.date); })		 
        .attr("cy", function(d) { return y(d.close); })		
        .on("mouseover", function(d) {		
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div	.html(formatTime(d.date) + "<br/>"  + d.close)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
        .on("mouseout", function(d) {		
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });
  	// Add the X Axis
  	svg.append("g")
  		.attr("class", "x axis")
  		.attr("transform", "translate(0," + height + ")")
  		.call(xAxis);

  	// Add the Y Axis
  	svg.append("g")
  		.attr("class", "y axis")
  		.call(yAxis);

  });


  }
  document.getElementById("file_input2").addEventListener('change', handleFileSelect2, false);

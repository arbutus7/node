
// user buttion handling
  d3.select("input[name=chamber1]").on("click", change1);
  d3.select("select[name=chm]").on("change", chageLangSelect);



var margin = {
        top: 50,
        right: 80,
        bottom: 30,
        left: 200
      },
      width = 1500- margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.open); });

var valueline3 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.middle); });


function change1() {
// Get the data

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv(filename1).then(function(data) {

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
      d.open = +d.open;
      d.middle = +d.middle;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) {
	  return Math.max(d.close, d.open); })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "red")
      .attr("d", valueline2);

  // Add the valueline2 path.
  svg.append("path")
      .data([data])
      .attr("class", "line")
      .style("stroke", "yellow")
      .attr("d", valueline3);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));

});




  }



  function chageLangSelect(){
      var langSelect = document.getElementById("id-lang");
      // select element에서 선택된 option의 value가 저장된다.
      var selectValue = langSelect.options[langSelect.selectedIndex].value;
      // select element에서 선택된 option의 text가 저장된다.
      //var selectText = langSelect.options[langSelect.selectedIndex].text;
      d3.select("svg").remove();
      if(selectValue == "chamber1"){

     filename1= "chamber1.csv";
         //d3.selectAll('svg').remove();
         // svg.remove();

          change1();
      }
      if(selectValue == "chamber2"){

           filename1= "chamber2.csv";
        change1();
      }

  }
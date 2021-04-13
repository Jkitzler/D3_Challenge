var svgWidth = 1000;
var svgHeight = 550;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Created an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Appended a SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initiated the Parameter
var chosenXAxis = "poverty";

// function used for updating the x-scale var upon click on axis label
function xScale(stateData, chosenXAxis) {
  // created scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(stateData, d => d[chosenXAxis])-1, d3.max(stateData, d => d[chosenXAxis])])
    .range([0, width]);

  return xLinearScale;

}

// function used for updating the xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

// function used for updating the circles group with a transition to the new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]));

  return circlesGroup;
}

// function used for updating the circles group with new tooltip
function updateToolTip(chosenXAxis, circlesGroup) {

  var label;

  if (chosenXAxis === "poverty") {
    label = "Percent in poverty:";
  }
  else {
    label = "Age:";
  }

  return circlesGroup;
}

// Retrieved data from the CSV file 
(async function(){
  var url = "https://cw.bootcampcontent.com/CW-Coding-Bootcamp/cwru-cle-data-pt-10-2020-u-c/-/blob/master/A%20-%20Homework/16-D3/Instructions/StarterCode/assets/data/data.csv";
  // var url = "/data/data.csv";
  var csvData = await d3.csv(url).catch(function(error) {
    console.log(error);
  });

  console.log(csvData);

  // parsed data. Converted the CSV data
  csvData.forEach(function(data) {
    data.id = +data.id;
    data.poverty = +data.poverty;
    data.povertyMoe = +data.povertyMoe;
    data.id = +data.id;
    data.age = +data.age;
    data.ageMoe = +data.ageMoe;
    data.income = +data.income;
    data.incomeMoe = +data.incomeMoe;
    data.healthcare = +data.healthcare;
    data.healthcareLow = +data.healthcareLow;
    data.healthcareHigh = +data.healthcareHigh;
    data.obesity = +data.obesity;
    data.obesityLow = +data.obesityLow;
    data.obesityHigh = +data.obesityHigh;
    data.smokes = +data.smokes;
    data.smokesLow = +data.smokesLow;
    data.smokesHigh = +data.smokesHigh;
  })

  var stateData = csvData;

  console.log(stateData);
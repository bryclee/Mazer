window.settings = {
  height: 20,
  width: 20,
  sizeOfBlock: 10,
}
var svg;

var colorCodes = {
  Wall: "black",
  Edge: "red",
  Path: "white",
  Player: "green",
  Exit: "blue",
  Empty: "black"
};

var pxl = function(num){
  return num + 'px';
}

var renderMap = function(layout) {
  var rects = d3.select('svg').selectAll('rect').data(layout)

  rects.style('fill', function(d) { return colorCodes[d]; })

  rects.enter().append('rect')
    .attr({
      'height': pxl(window.settings.sizeOfBlock),
      'width': pxl(window.settings.sizeOfBlock),
      'x': function(d,i) { return pxl(window.settings.sizeOfBlock * (i % window.settings.height)) },
      'y': function(d,i) { return pxl(window.settings.sizeOfBlock * Math.floor(i / window.settings.height)) }
    }).style('fill', function(d) { return colorCodes[d]; });
};

$(function() {
  svg = d3.select('body').append('svg')
              .attr({
                'height': pxl(window.settings.height * window.settings.sizeOfBlock),
                'width': pxl(window.settings.width * window.settings.sizeOfBlock)
                });  

  var gameMap = new makeMap(window.settings.height, window.settings.width);
  gameMap.BFgenerate(renderMap);

  renderMap(gameMap.layoutBF);
});
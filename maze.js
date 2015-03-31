var makeMap = function(height, width) {
  this.height = height;
  this.width = width;
  this.layoutBF = createArray(height * width, 'Empty');
  this.layoutDF = createArray(height * width, 'Empty');
  this.seed = Math.floor(Math.random() * height * width);
};

var randNum = function(param) {
  return Math.floor(Math.random() * param);
}

var createArray = function(size, fill) {
  var result = [];
  for (var i = 0; i < size; i++) {
    result.push(fill);
  }
  return result;
}

makeMap.prototype.surrounding = function(idx){
  var res = [];
  var layout = this.layoutBF;

  if ((idx % this.width + 1) !== 0)
    res.push(idx + 1);
  if ((idx % this.width - 1) !== -1)
    res.push(idx - 1);
  if (Math.floor(idx % this.width) !== 0)
    res.push(idx + this.height);
  if (Math.floor(idx % this.width) !== this.height - 1)
    res.push(idx - this.height);

  return res;
};

makeMap.prototype.BFgenerate = function(cb) {
  //generate a map using BF approach
  var edges = [];
  var layout = this.layoutBF;
  layout[this.seed] = 'Path';
  var self = this;

  //generate surrounding edges of seed
  edges = self.surrounding(self.seed);

  for (var i = 0; i < edges.length; i++) {
    layout[edges[i]] = "Edge";
  }
    //check if there are two surrounding paths to an edge
  var updateMap = function(){
    var pick = randNum(edges.length);
    var pick = edges.splice(pick, 1)[0];
    var nextTo = self.surrounding(pick);
    if (_.reduce(nextTo, function(a,b) { 
      return (layout[b] === 'Path' ? a+1 : a);
    }, 0) > 1) {
      //if yes, declare it as a wall
      layout[pick] = 'Wall';
    } else {
      //otherwise, declare as a path and add it's edges
      layout[pick] = 'Path';
      nextTo.forEach(function(i){
        if (layout[i] === 'Empty') {
          layout[i] = 'Edge';
          edges.push(i);
        }
      });
    }
    cb(layout);
    if (edges.length) {
      setTimeout(updateMap, 0);
    }
  }
  
  updateMap();
};

makeMap.prototype.DFgenerate = function() {

}
  

makeMap.prototype.checkCollision = function(x,y) {
  //check the layout at x, y to see if block exists there
  //return true or false
}
//makeMap
  //nodes
  //generate paths
  //check collision
//player
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

var makeMap = function(height, width) {
  this.height = height;
  this.width = width;
  this.layoutBF = createArray(height * width, 'Empty');
  this.layoutDF = createArray(height * width, 'Empty');
  this.seed = Math.floor(Math.random() * height * width);
};

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
  var edges = [];
  var layout = this.layoutBF;
  layout[this.seed] = 'Path';

  //generate surrounding edges of seed
  edges = this.surrounding(this.seed);

  for (var i = 0; i < edges.length; i++) {
    layout[edges[i]] = "Edge";
  }
  while (edges.length > 0) {
  //edges = each unused edge
  //while there are unused edges
    //fill in one randomly
    //add in all unused edges around it
    var pick = randNum(edges.length);
    var pick = edges.splice(pick, 1)[0];
    var nextTo = this.surrounding(pick);
    //if two paths next to the edge
    if (_.reduce(nextTo, function(a,b) { 
      if (layout[b] === 'Path')
        a++;
      return a;
    }, 0) > 1) {
      //set to a wall
      layout[pick] = 'Wall';
    } else {
      //else set as a path, add its edges
      layout[pick] = 'Path';
      nextTo = _.filter(nextTo, function(a) {
        return layout[a] === 'Empty';
      });
      nextTo.forEach(function(i){
        layout[i] = 'Edge';
      });
      edges = edges.concat(nextTo);
    }

    cb(layout);
  }
};

makeMap.prototype.DFgenerate = function() {

}
  

makeMap.prototype.checkCollision = function(x,y) {
  //check the layout at x, y to see if block exists there
  //return true or false
}
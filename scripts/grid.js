'use strict';
var fs = require('fs'),
    path = require('path'),
    im = require('imagemagick'),
    Handlebars = require('handlebars'),
    picturePath = __dirname + '/../assets/picture_large.png',
    templateStr = fs.readFileSync(__dirname + '/../templates/grid.html', 'utf8');

var targetDir = __dirname + '/../grid/';
fs.readdirSync(targetDir).forEach(function(fn){
  if (path.extname(fn) === '.html') {
    fs.unlinkSync(targetDir + fn);
  }
});

var template = Handlebars.compile(templateStr);

var dimensions = ['2x2', '4x2', '4x3', '4x4', '5x4', '6x4'];

dimensions.forEach(function(dimension){
  var hw = dimension.split('x'),
      width = Number(hw[0]),
      height = Number(hw[1]),
      totalChunks = height * width,
      chunkDir = __dirname + '/../grid/' + totalChunks + '_chunks/';

  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir);
  }

  im.convert([picturePath, '-crop', dimension + '@', '+repage', '+adjoin', chunkDir + 'chunk%d.png'], 
    function(err, stdout){
      if (err) throw err;      
    });

  // Create array for handlebar.js fields
  var dimensionArr = [];
  var counter = 0;
  for (var row = 0; row < height; row++) {
    var rowArr = [];

    for (var cell = 0; cell < width; cell++) {
      var name = 'chunk' + counter++;
      rowArr.push(name);
    }

    dimensionArr.push({ row: rowArr });
  }

  var context = {
    dimensions: dimensionArr,
    numOfChunks: totalChunks
  };

  var results = template(context);
  var fileName = targetDir + totalChunks + '_chunks.html';  
  fs.writeFileSync(fileName, results, 'utf8');
});
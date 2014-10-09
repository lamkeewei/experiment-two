'use strict';

var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars'),
    templateStr = fs.readFileSync(__dirname + '/../templates/base64.html', 'utf8');

var targetDir = __dirname + '/../base64/';
fs.readdirSync(targetDir).forEach(function(fn){
  if (path.extname(fn) === '.html') {
    fs.unlinkSync(targetDir + fn);
  }
});

var template = Handlebars.compile(templateStr);

for (var i = 4; i <= 24; i += 4) {  
  var context = { numOfChunks : i };
  var fileName = targetDir + i + '_chunks.html';

  var result = template(context);
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }

  fs.writeFileSync(fileName, result, 'utf8');
}




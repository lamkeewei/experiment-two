'use strict';

var fs = require('fs'),
    path = require('path'),
    Handlebars = require('handlebars'),
    templateStr = fs.readFileSync(__dirname + '/../templates/text.html', 'utf8');

var targetDir = __dirname + '/../text/';
fs.readdirSync(targetDir).forEach(function(fn){
  if (path.extname(fn) === '.html') {
    fs.unlinkSync(targetDir + fn);
  }
});

// Copy over fresh base test
fs.createReadStream(__dirname + '/../base/text.html')
  .pipe(fs.createWriteStream(targetDir + '1_chunks.html'));

// Generate templated codes
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
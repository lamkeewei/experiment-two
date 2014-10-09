'user strict';

var fs = require('fs');
    Handlebars = require('handlebars'),
    templateStr = fs.readFileSync(__dirname + '/../templates/text.html', 'utf8');

var template = Handlebars.compile(templateStr);

for (var i = 4; i <= 24; i += 4) {  
  var context = { numOfChunks : i };
  var fileName = __dirname + '/../text/' + i + '_chunks.html';

  var result = template(context);
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
  }

  fs.writeFileSync(fileName, result, 'utf8');
}




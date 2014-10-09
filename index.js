var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))


var renderer = pixi.WebGLRenderer(800, 600);
document.body.appendChild(renderer.view);
var stage = new pixi.Stage();

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

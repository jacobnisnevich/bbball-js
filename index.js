var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'html');
app.enable('view cache');
app.engine('html', require('hogan-express'));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/images", express.static(__dirname + '/images'));
app.use(bodyParser.urlencoded({ extended: true }));

var playerCount = 0;
var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8080});
wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		if (message = "Player Connected") {
			console.log(message);
			playerCount++;
			console.log(playerCount)
			ws.send(playerCount.toString());
		}
	});
});

app.get('/', function(req, res) {
	res.render('index.html')
})

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
})
var request = require('request');
var express = require('express');
var http = require('http');
var WebSocketServer = require('ws').Server;
var bodyParser = require('body-parser');
var app = express();

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

var server = http.createServer(app);
server.listen(app.get('port'));
console.log("http server listening on %d", app.get('port'));

var wss = new WebSocketServer({server: server});
console.log("WebSocketServer created");
wss.on('connection', function(ws) {
	ws.on('message', function(message) {
		if (message = "Player Connected") {
			console.log(message);
			playerCount++;
			console.log(playerCount);
			wss.clients.forEach(function each(client) {
				client.send(playerCount.toString());
			});
		}
	});
	ws.on('close', function() {
		console.log("Player Disconnected");
		playerCount--;
		console.log(playerCount);
	});
});

app.get('/', function(req, res) {
	res.render('index.html')
})

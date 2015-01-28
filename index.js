var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var Player = require("./Player").Player;

app.use("/styles", express.static(__dirname + "/styles"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/lib", express.static(__dirname + "/lib"));
app.use("/images", express.static(__dirname + "/images"));

var playerCount = 0;

var players = [];

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket) {
	socket.on('disconnect', function() {
		console.log("Player has disconnected: " + this.id);
		var removePlayer = playerById(this.id);
		if (!removePlayer) {
			console.log("Player not found: " + this.id);
			return;
		};
		players.splice(players.indexOf(removePlayer), 1);
	});
	socket.on('new player', function(data) {
		console.log("New player: " + this.id);
		var newPlayer = new Player(data.x, data.y, data.frame);
		newPlayer.id = this.id;
		this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), frame: newPlayer.getFrame()});

		var i, existingPlayer;
		for (i = 0; i < players.length; i++) {
			existingPlayer = players[i];
			this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), frame: existingPlayer.getFrame()});			
		}

		players.push(newPlayer);
	});
	socket.on('move player', function(data) {
		console.log("Move player: " + this.id);
		var movePlayer = playerById(this.id);

		if (!movePlayer) {
			console.log("Player not found: " + this.id);
			return;
		}

		movePlayer.setX(data.x);
		movePlayer.setY(data.y);
		movePlayer.setFrame(data.frame);

		this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY(), frame: movePlayer.getFrame()});
	});
});

function playerById(id) {
	var i;
	for (i = 0; i < players.length; i++) {
		if (players[i].id == id) {
			return players[i];
		}
	};
}

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
})
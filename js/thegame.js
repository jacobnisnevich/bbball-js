var theGame = function(game){}

var host = location.origin;
var player;
var socket;
var others;

theGame.prototype = {
	create: function() {
		socket = io.connect(host);
		console.log("Socket connected to " + host);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.add.sprite(0, 0, 'sky');

		platforms = this.game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, this.game.world.height - 64, 'ground');
		ground.scale.setTo(2,2);
		ground.body.immovable = true;

		others = [];

		player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
		this.game.physics.arcade.enable(player);
		player.body.bounce.y = 0.2
		player.body.gravity.y = 300;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		setEventHandlers();
	},
	update: function() {
		this.game.physics.arcade.collide(player, platforms);

		cursors = this.game.input.keyboard.createCursorKeys();
		player.body.velocity.x = 0;
		if (cursors.left.isDown) {
			player.body.velocity.x = -150;
			player.animations.play('left');
		} else if (cursors.right.isDown) {
			player.body.velocity.x = 150;
			player.animations.play('right');
		} else {
			player.animations.stop();
			player.frame = 4;
		}

		if (cursors.up.isDown && player.body.touching.down) {
			player.body.velocity.y = -350;
		}

		var playerData = {
			x: player.x,
			y: player.y,
			frame: player.frame
		}

		socket.emit("move player", playerData);
	}
}

var setEventHandlers = function() {
	socket.on("connect", function() {
		console.log("Connection to server established");
		socket.emit("new player", {
			x: player.x,
			y: player.y,
			frame: player.frame
		});
	});
	socket.on("disconnect", function() {
		console.log("Disconnected from server")
	});
	socket.on("new player", function(data) {
		console.log("New player " + data.id + " connected");
		others.push(new multiplayerPlayer(data.id, game, player, data.x, data.y, data.frame));
	});
	socket.on("move player", function(data) {
		var movePlayer = playerById(data.id);

		if (!movePlayer) {
			console.log("Player not found: " + data.id);
			return;
		}

		movePlayer.player.x = data.x;
		movePlayer.player.y = data.y;
		movePlayer.player.frame = data.frame;
	});
	socket.on("remove player", function(data) {
		var removePlayer = playerById(data.id);

		if (!removePlayer) {
			console.log("Player not found: " + data.id);
			return;
		}

		removePlayer.player.kill();

		others.splice(others.indexOf(removePlayer), 1);
	});
};
multiplayerPlayer = function(index, game, player, initX, initY, initFrame) {
	var x = initX;
	var y = initY;
	var frame = initFrame;

	this.game = game;
	this.player = player;
	this.alive = true;

	this.player = game.add.sprite(x, y, 'dude_remote');

	this.player.animations.add('left', [0, 1, 2, 3], 10, true);
	this.player.animations.add('right', [5, 6, 7, 8], 10, true);
	game.physics.arcade.enable(this.player);
	console.log(this.player);

	this.player.name = index.toString();
	this.player.body.immovable = true;
	this.player.body.collideWorldBounds = true;
};
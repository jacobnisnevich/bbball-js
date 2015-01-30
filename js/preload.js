var preload = function(game){}

preload.prototype = {
	preload: function() {
		this.game.load.image('sky', '/images/sky.png');
		this.game.load.image('ground', '/images/platform.png');
		this.game.load.spritesheet('dude', '/images/dude_custom.png', 32, 48);
		this.game.load.spritesheet('dude_remote', '/images/dude.png', 32, 48);
	},
	create: function(){
		this.game.state.start("TitleScreen");
	}
}
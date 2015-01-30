var help = function(game) {};

help.prototype = {
	create: function() {
		this.game.state.start("TheGame");
	}
}
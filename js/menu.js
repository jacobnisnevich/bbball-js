var menu = function(game) {};

menu.prototype = {
	create: function() {
		this.game.state.start("TheGame");
	}
}
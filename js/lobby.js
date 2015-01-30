var lobby = function(game) {};

lobby.prototype = {
	create: function() {
		this.game.state.start("TheGame");
	}
}
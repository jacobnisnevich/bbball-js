var menu = function(game) {};

menu.prototype = {
	create: function() {
		this.add.sprite(0, 0, 'menu');
		var title = this.add.sprite(400, 100, 'gametitle');
		title.anchor.setTo(0.5,0.5);
		var lobbyButton = this.game.add.button(400, 250, "lobbybutton", this.lobbyState, this);
		lobbyButton.anchor.setTo(0.5,0.5);
	},
	lobbyState: function() {
		this.game.state.start("TheGame");
	}
}
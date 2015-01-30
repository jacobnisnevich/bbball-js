var loading = function(game) {
	console.log("%cStarting bbball-js", "color:white; background:green");
};

loading.prototype = {
	create: function() {
		this.game.state.start("Preload");
	}
}
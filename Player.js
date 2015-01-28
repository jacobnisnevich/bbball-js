var Player = function(initX, initY, initFrame) {
	var x = initX;
	var y = initY;
	var frame = initFrame;
	var id;

	var getX = function() {
		return x;
	};
	var getY = function() {
		return y;
	};
	var getFrame = function() {
		return frame;
	};
	var setX = function(newX) {
		x = newX;
	};
	var setY = function(newY) {
		y = newY; 
	};
	var setFrame = function(newFrame) {
		frame = newFrame;
	};

	return {
		getX: getX,
		getY: getY,
		getFrame: getFrame,
		setX: setX,
		setY: setY,
		setFrame: setFrame,
		id: id
	}
};

exports.Player = Player;
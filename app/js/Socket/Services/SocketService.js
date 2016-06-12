module.exports = function () {
	return {
		connect: connect,
		listenStart: listenStart,
		listenEnd: listenEnd,
		listenPlayerJoined: listenPlayerJoined,
		listenMatch: listenMatch
	};

	var socket;

	function connect(gameId) {
		if(io){
			socket = io.connect('http://mahjongmayhem.herokuapp.com?gameId=' + gameId);
		}
	}

	function listenStart(callback){
		socket.on("start", function(){
			if(callback) callback();
		});
	}

	function listenEnd(callback){
		socket.on("end", function(){
			if(callback) callback();
		});
	}

	function listenPlayerJoined(callback){
		socket.on("playerJoined", function(data){
			if(callback) callback(data);
		});
	}

	function listenMatch(callback){
		socket.on("match", function(data){
			if(callback) callback(data);
		});
	}
};
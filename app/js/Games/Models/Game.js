module.exports = function(data){
	var self = this;
	
	self._id = data._id;
	
	self.createdBy = data.createdBy;
	
	self.createdOn = data.createdOn;
	self.startedOn = data.startedOn;
	self.endedOn = data.endedOn;

	self.gameTemplate = data.gameTemplate;
	
	self.players = data.players;
	self.maxPlayers = data.maxPlayers;
	self.minPlayers = data.minPlayers;

	self.state = data.state;
}
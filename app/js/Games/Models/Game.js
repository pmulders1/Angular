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

/*

endedOn: "2015-04-30T09:58:43.516Z",
gameTemplate: 
{
_id: "Dragon",
__v: 0,
id: "Dragon"
},
__v: 0,
players: 
[
{
_id: "mmaa.schuurmans@avans.nl",
name: "Martijn Schuurmans",
__v: 0,
id: "mmaa.schuurmans@avans.nl"
}
],
maxPlayers: 32,
minPlayers: 2,
state: "finished",

*/
/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/5/13
 * Time: 9:50 PM
 * To change this template use File | Settings | File Templates.
 */
function GameModel(game)
{
    this.game = game;
    this.player = "";
    this.fire = [[0],[0],[0]];
    this.water = [[0],[0],[0]];
    this.council = [[0],[0],[0]];
    this.stats =
    {
        population:19102,
        housePrice:460000,
        houseDensity:3,
        income:4.5,
        expenses:5.5
    }
    this.dataChanged = false;
    this.updateInterval = 1000;
    this.updateEnabled = false;
    this.notifyListener;
    this.xhr = null;
}

GameModel.prototype.calcStats = function()
{

}
GameModel.prototype.setChangeListener = function(callback)
{
    this.notifyListener = callback;
}

GameModel.prototype.parseUpdate = function(json)
{

    //console.log("XHR update received");
    //console.log(JSON.stringify(json,null,4));
    for(var i=0;i<json.length;i++)
    {
        this.setDecision(json[i].playerId,json[i].decisionId,json[i].selection);

    }
    //console.log("parse update complete. GameModel:");
    if(this.dataChanged)
    {
        //console.log(JSON.stringify(this,null,4));
        this.calcStats();
        this.dataChanged = false;
        this.notifyListener();
    }
}
GameModel.prototype.setDecision = function(playerId,decisionId,selection)
{
    if(playerId == "fire" || playerId == "water" || playerId == "council")
    {
        if(selection.length == 0)
        {
            selection = [0];
        }
        if(!this[playerId][decisionId].compare(selection))
        {
            this.dataChanged = true;
            this[playerId][decisionId] = selection;
        }
    }
}

GameModel.prototype.sendDecision = function(playerId,decisionId,selection)
{

    this.xhr.abort();
    var selString ="";
    if(selection.length > 0)
    {
        selString+=selection[0].toString();
    }
    for(var i = 1;i<selection.length;i++)
    {
        selString += ":"+selection[i].toString();
    }
    console.log("sending p="+playerId+" d="+decisionId+" s="+selString);
    $.ajax({
        type: "POST",
        url: "/game",
        data: {
            playerId:playerId,
            decisionId:decisionId,
            selection:selString

        },
        success: this.parseUpdate.bind(this),
        dataType: 'json'
    });
    //this.setDecision(playerId,decisionId,selection);
    //this.notifyListener();
    //this.dataChanged = false;
}

GameModel.prototype.reset = function()
{
    var data = {};
    if(this.player == "spectator")
    {
        data.reset = "all";
    }else
    {
        data.reset = this.player;
    }
    $.ajax({
        type: "POST",
        url: "/game",
        data: data,
        success: this.parseUpdate.bind(this),
        dataType: 'json'
    });
}
GameModel.prototype.setPlayer = function(player)
{
    this.player = player;
    this.notifyListener();
}
GameModel.prototype.stopUpdateTimer = function()
{
    this.updateEnabled = false;
    clearTimeout(this.doUpdateXHR.bind(this));
}
GameModel.prototype.startUpdateTimer = function()
{
    this.updateEnabled = true;
    setTimeout(this.doUpdateXHR.bind(this),this.updateInterval);
}

GameModel.prototype.doUpdateXHR = function()
{
    //console.log("doing model update XHR");
    this.xhr = $.getJSON("/game",this.parseUpdate.bind(this));
    if(this.updateEnabled)
    {
        setTimeout(this.doUpdateXHR.bind(this),this.updateInterval);
    }
}

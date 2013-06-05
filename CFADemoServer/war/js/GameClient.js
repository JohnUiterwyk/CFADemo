function GameClient()
{
    this.id = "GameClient"
    this.intro = new IntroController(this);
    this.game = new GameView();

}
GameClient.prototype.initialize = function()
{
    this.intro.initialize();

//    var canvas =  $("#gameDiv");
//    canvas.attr('width', $(window).innerWidth())
//    canvas.attr('height', $(window).innerHeight());
    stage = new Kinetic.Stage({
        container: 'gameDiv',
        width: 1024,
        height: 964
    });
    this.game.initialize();
   //this.loadPlayer("fire");
}
GameClient.prototype.loadPlayer = function(player)
{
    this.game.show();
    this.intro.hide();
    this.game.loadPlayer(player);
}
GameClient.prototype.onWindowResize = function()
{
    var canvas =  $("#gameDiv");
    canvas.attr('width', $(window).innerWidth())
    canvas.attr('height', $(window).innerHeight());
}

var stage;
var gameClient = new GameClient();
$(document).ready(gameClient.initialize());

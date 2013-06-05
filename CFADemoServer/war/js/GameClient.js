function GameClient()
{
    this.id = "GameClient"
    this.intro = new IntroController(this);
    this.game = new GameView();

}
GameClient.prototype.initialize = function()
{
    this.intro.initialize();

    var canvas =  $("#gameCanvas");
    canvas.attr('width', $(window).innerWidth())
    canvas.attr('height', $(window).innerHeight());
    $(wind)
    //debug
   //this.loadPlayer("fire");
}
GameClient.prototype.loadPlayer = function(player)
{
   this.game.initialize(player);
   this.intro.hide();
}
GameClient.prototype.onWindowResize = function()
{}

var stage;
var game = new GameClient();
 $(document).ready(game.initialize());
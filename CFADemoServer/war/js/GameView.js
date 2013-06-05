/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/5/13
 * Time: 1:32 PM
 * To change this template use File | Settings | File Templates.
 */
function GameView()
{
    this.map = new GameMap();
}
GameView.prototype.initialize = function(player)
{
   this.player = player;
   this.map.initialize();
   this.show();
}

GameView.prototype.show = function()
{
   $("#gameView").show();
}

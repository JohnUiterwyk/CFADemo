/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/4/13
 * Time: 10:31 PM
 * To change this template use File | Settings | File Templates.
 */
function IntroController(game)
{
    this.game = game;
    this.id = "IntroController";

}
IntroController.prototype.initialize = function()
{
    var that = this;
    $(".introTeamButton").on("touchstart mousedown",function(event){that.onTouchDown(event,this)});
    $(".introTeamButton").on("touchend mouseup",function(event){that.onTouchUp(event,this)});
}
IntroController.prototype.show = function()
{
    $("#intro").show();
}
IntroController.prototype.hide = function()
{
    $("#intro").hide();
}
IntroController.prototype.showTeamButtons = function()
{
    $("#teamButtons").css("visibility","visible");
}
IntroController.prototype.onTouchDown = function(event,target)
{
       $("#"+target.id).css("background-color","rgba(255,255,255,.5)");
}
IntroController.prototype.onTouchUp = function(event,target)
{
    $(".introTeamButton").css("background-color","transparent");
    switch(target.id)
    {
        case "fireTeamButton":
            this.game.loadPlayer("fire");
            break;
        case "waterTeamButton":
            this.game.loadPlayer("water");
            break;
        case "councilTeamButton":
            this.game.loadPlayer("council");
            break;
        case "specButton":
            this.game.loadPlayer("spectator");
            break;
    }
}
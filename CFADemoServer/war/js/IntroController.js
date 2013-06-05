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
    $(".introTeamButton").on("click",function(event){that.onTeamClick(event,this)});
}
IntroController.prototype.show = function()
{
    $("#intro").show();
}
IntroController.prototype.hide = function()
{
    $("#intro").hide();
}
IntroController.prototype.onTeamClick = function(event,target)
{
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
            this.game.loadPlayer("spec");
            break;
    }
}
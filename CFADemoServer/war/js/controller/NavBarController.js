/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/4/13
 * Time: 10:31 PM
 * To change this template use File | Settings | File Templates.
 */
function NavBarController(game)
{
    this.game = game;
    this.id = "NavBarController";


}
NavBarController.prototype.initialize = function()
{
    var that = this;
    $(".navBarButton").on("touchstart mousedown",function(event){that.onButtonClick(event,this)});
    //$("#navBarTitle").on("touchstart mousedown",function(){location.reload()});
}
NavBarController.prototype.showButtons = function()
{
    $(".navBarButton").show();
}
NavBarController.prototype.hideButtons = function()
{
    $(".navBarButton").hide();
}

NavBarController.prototype.onButtonClick = function(event,target)
{
    switch(target.id)
    {
        case "navBarLeftButton":
            this.game.loadIntro();
            break;
        case "navBarRightButton":
            this.game.model.reset();
            break;
    }
}
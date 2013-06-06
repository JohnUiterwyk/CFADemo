/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/5/13
 * Time: 1:32 PM
 * To change this template use File | Settings | File Templates.
 */
function GameView(game)
{
    this.game = game;
    this.map = new GameMap(game);
    this.spectatorStatsPanel = new SpectatorStatsPanel(game);
    this.fireStatsPanel = new FireStatsPanel(game);
    this.waterStatsPanel = new WaterStatsPanel(game);
    this.councilStatsPanel = new CouncilStatsPanel(game);
    this.fireDecisionPanel = new FireDecisionPanel(game);
    this.waterDecisionPanel = new WaterDecisionPanel(game);
    this.councilDecisionPanel = new CouncilDecisionPanel(game);
    this.spectatorDecisionPanel = new SpectatorDecisionPanel(game);
}

GameView.prototype.initialize = function()
{
    this.map.initialize();
    this.spectatorStatsPanel.initialize();
    this.fireStatsPanel.initialize();
    this.waterStatsPanel.initialize();
    this.councilStatsPanel.initialize();
    this.fireDecisionPanel.initialize();
    this.waterDecisionPanel.initialize();
    this.councilDecisionPanel.initialize();
    this.spectatorDecisionPanel.initialize();


}
GameView.prototype.showPlayer = function(player)
{
    this.game.stage.removeChildren();
    this.game.stage.add(this.map.background);
    this.game.stage.add(this.map.overlay);
    switch(player)
    {
        case "spectator":
            this.game.stage.add(this.spectatorStatsPanel.panel);
            this.game.stage.add(this.spectatorDecisionPanel.panel);
            break;
        case "fire":
            this.game.stage.add(this.fireStatsPanel.panel);
            this.game.stage.add(this.fireDecisionPanel.panel);
            break;
        case "water":
            this.game.stage.add(this.waterStatsPanel.panel);
            this.game.stage.add(this.waterDecisionPanel.panel);
            break;
        case "council":
            this.game.stage.add(this.councilStatsPanel.panel);
            this.game.stage.add(this.councilDecisionPanel.panel);
            break;
    }

}
GameView.prototype.show = function()
{
   $("#gameDiv").show();
}
GameView.prototype.hide = function()
{
    $("#gameDiv").hide();
}
GameView.prototype.update = function(model)
{
    this.map.update(model);
    this.spectatorStatsPanel.update(model);
    this.fireStatsPanel.update(model);
    this.waterStatsPanel.update(model);
    this.councilStatsPanel.update(model);
    this.fireDecisionPanel.update(model);
    this.waterDecisionPanel.update(model);
    this.councilDecisionPanel.update(model);
    this.spectatorDecisionPanel.update(model);
}
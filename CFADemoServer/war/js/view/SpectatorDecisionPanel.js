/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/7/13
 * Time: 5:03 AM
 * To change this template use File | Settings | File Templates.
 */
function SpectatorDecisionPanel(game)
{
    this.game = game;
    this.panel = new Kinetic.Layer();
    this.bgRect = null;
    this.zoning = new DecisionSummaryBox(game);
    this.building = new DecisionSummaryBox(game);
    this.infrastructure = new DecisionSummaryBox(game);
    this.councilSummaryBox = new CouncilSummaryBox(game);
    //this.decitionThree =

}
SpectatorDecisionPanel.prototype.initialize = function()
{
    this.panel.setPosition(768,0);
    //draw background 560x180
    this.addBackground();
}
SpectatorDecisionPanel.prototype.addBackground = function()
{
    this.bgRect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 256,
        height: 708,
        fill:"rgba(255,255,255,.5)",
        shadowColor:"#000000",
        shadowOpacity:.5,
        shadowOffsetX:-5



    });
    this.panel.add(this.bgRect);

    this.zoning.initialize({
        x:10,
        y:20,
        width: 230,
        height: 110,
        boxHeight:15,
        title:"Residential Zoning",
        decisionId: 0

    });
    this.panel.add(this.zoning.kineticGroup);

    this.building.initialize({
        x:10,
        y:140,
        width: 230,
        height: 110,
        boxHeight:15,
        title:"Building Regulations",
        decisionId: 1

    });
    this.panel.add(this.building.kineticGroup);

    this.infrastructure.initialize({
        x:10,
        y:260,
        width: 230,
        height: 125,
        boxHeight:30,
        title:"Infrastructure",
        decisionId: 2

    });
    this.panel.add(this.infrastructure.kineticGroup);

    this.councilSummaryBox.initialize({
        x:10,
        y:395,
        width: 230,
        height: 185
    });
    this.panel.add(this.councilSummaryBox.kineticGroup);
}
SpectatorDecisionPanel.prototype.update = function(model)
{
    this.zoning.update(model);
    this.building.update(model);
    this.infrastructure.update(model);
    this.councilSummaryBox.update(model);
}
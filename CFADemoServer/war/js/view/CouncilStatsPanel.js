/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 7:42 PM
 * To change this template use File | Settings | File Templates.
 */
function CouncilStatsPanel(game)
{
    this.game = game;
    this.panel = new Kinetic.Layer();
    this.bgRect = null;
    this.buildingText = null;
    this.budgetGraph = new CouncilBudgetGraph(game);

}
CouncilStatsPanel.prototype.initialize = function()
{
    this.panel.setPosition(160,20);
    //draw background 560x180
    this.addBackground();
    this.addText();
    this.budgetGraph.initialize(380,10);
    this.panel.add(this.budgetGraph.kineticGroup);

}

CouncilStatsPanel.prototype.addBackground = function()
{
    this.bgRect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 560,
        height: 180,
        fillLinearGradientStartPoint: [0, 0],
        fillLinearGradientEndPoint: [0, 180],
        fillLinearGradientColorStops: [0, "rgba(255,255,255,1)", 1, "rgba(255,255,255,0)"]

    });
    this.panel.add(this.bgRect);
}
CouncilStatsPanel.prototype.addText = function()
{
    this.buildingText = new Kinetic.Text({
        x: 10,
        y: 10,
        width: 320,
        text: "",
        lineHeight: 1.5,
        fontSize: 16,
        fontFamily: 'Oswald',
        fill: '#666666'
    });

    var text = "Although Belleville is a stunning location, "
    	+"its fire and flood risk factors need addressing. "
    	+"The local council must try to minimise risk, "
    	+"whilst still ensuring population, average house prices "
    	+"and the council budget are all sustainable.";

    this.buildingText.setText(text);
    this.panel.add(this.buildingText);
}
CouncilStatsPanel.prototype.update = function(model)
{
    if(model.stats.income != this.budgetGraph.lastIncome || model.stats.expenses != this.budgetGraph.lastExpense)
    {
        this.budgetGraph.update(model);
        this.panel.draw();
    }
}

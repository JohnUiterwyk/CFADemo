/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 6:10 PM
 * To change this template use File | Settings | File Templates.
 */
function CouncilBudgetGraph(game)
{
    this.game = game;
    this.kineticGroup = new Kinetic.Group();
    this.incomeBar = null;
    this.expenseBar = null;
    this.lastIncome = 0;
    this.lastExpense = 0;
}
CouncilBudgetGraph.prototype.initialize = function(x,y)
{
    this.kineticGroup.setPosition(x,y);
    this.addText('Council Budget',14,'#5b5600',0,0);
    this.addText('Income',12,'#5b5600',35,130);
    this.addText('Expenses',12,'#5b5600',90,130);
    this.addText('10m',12,'#5b5600',0,20);
    this.addText('8m',12,'#5b5600',0,40);
    this.addText('6m',12,'#5b5600',0,60);
    this.addText('4m',12,'#5b5600',0,80);
    this.addText('2m',12,'#5b5600',0,100);
    for(var i=0;i<10;i++)
    {
        this.addLine('#ffffff',[25, i*10+25, 140, i*10+25]);
    }
    this.incomeBar  = new Kinetic.Rect({
    x: 35,
    y: 25,
    width: 45,
    height: 1,
    fill:'#c1d82f'});
    this.kineticGroup.add(this.incomeBar);

    this.expenseBar  = new Kinetic.Rect({
        x: 90,
        y: 25,
        width: 45,
        height: 1,
        fill:'#5b5600'});
    this.kineticGroup.add(this.expenseBar);

    this.addLine('#666666',[25, 20, 25, 125, 140, 125]);

}
CouncilBudgetGraph.prototype.update = function(model)
{

        this.incomeBar.setHeight(model.stats.income *10);
        this.incomeBar.setPosition(35,25+100-this.incomeBar.getHeight());
        this.expenseBar.setHeight(model.stats.expenses *10);
        this.expenseBar.setPosition(90,25+100-this.expenseBar.getHeight());
        this.lastExpense =  model.stats.expenses;
        this.lastIncome =  model.stats.income;
}
CouncilBudgetGraph.prototype.addLine = function(color,points)
{
    var line = new Kinetic.Line({
        points: points,
        stroke: color,
        strokeWidth: 2
    });
    this.kineticGroup.add(line);
}
CouncilBudgetGraph.prototype.addText = function(text,size,color,x,y)
{
    var textObj = new Kinetic.Text({
        x: x,
        y: y,
        text: text,
        fontSize: size,
        fontFamily: 'Oswald',
        fill: color
    });
    this.kineticGroup.add(textObj);
}
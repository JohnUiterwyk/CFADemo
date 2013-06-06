/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/7/13
 * Time: 6:19 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/7/13
 * Time: 5:06 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 10:49 PM
 * To change this template use File | Settings | File Templates.
 */
function CouncilSummaryBox(game)
{
    this.game = game;
    this.kineticGroup = new Kinetic.Group();
    this.ratesBoxBar = new BoxBar(game);
    this.densityBoxBar = new BoxBar(game);
    this.feesBoxBar = new BoxBar(game);
    this.bgRect = null;
    this.settings = null;
}
CouncilSummaryBox.prototype.initialize = function(settings)
{
    this.settings = settings;
    this.kineticGroup.setPosition(settings.x,settings.y);

    this.bgRect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: settings.width,
        height: settings.height,
        fillLinearGradientStartPoint: [0, 0],
        fillLinearGradientEndPoint: [0, settings.height],
        fillLinearGradientColorStops: [0, "rgba(255,255,255,.8)", 1, "rgba(255,255,255,0)"]

    });
    this.kineticGroup.add(this.bgRect);
    //Title





    this.addText("Rates",10,10);
    this.addIcon(10,35);
    this.ratesBoxBar.initialize({
        x:36,
        y:40,
        width: 185,
        height: 15,
        player: 'council',
        mouseEnabled: false
    });
    this.kineticGroup.add(this.ratesBoxBar.kineticGroup);

    this.addText("Housing Density",10,70);
    this.addIcon(10,95);
    this.densityBoxBar.initialize({
        x:36,
        y:100,
        width: 185,
        height: 15,
        player: 'council',
        mouseEnabled: false
    });
    this.kineticGroup.add(this.densityBoxBar.kineticGroup);

    this.addText("Developer Fees",10,130);
    this.addIcon(10,155);
    this.feesBoxBar.initialize({
        x:36,
        y:160,
        width: 185,
        height: 15,
        player: 'council',
        mouseEnabled: false
    });
    this.kineticGroup.add(this.feesBoxBar.kineticGroup);


}
CouncilSummaryBox.prototype.addIcon =  function(x,y)
{
    var icon = new Kinetic.Image({
        x: x,
        y: y,
        image: this.game.images.getImage("iconSmallCouncil"),
        width:16,
        height:22
    });
    this.kineticGroup.add(icon);
}

CouncilSummaryBox.prototype.addText = function(text,x,y)
{
    var textObj = new Kinetic.Text({
        x: x,
        y: y,
        text: text,
        fontSize: 16,
        fontStyle: 'bold',
        fontFamily: 'Oswald',
        fill: "#666666"
    });
    this.kineticGroup.add(textObj);
}

CouncilSummaryBox.prototype.update = function(model)
{
    this.ratesBoxBar.fillSelect(model['council'][0][0]);
    this.densityBoxBar.fillSelect(model['council'][1][0]);
    this.feesBoxBar.fillSelect(model['council'][2][0]);
}
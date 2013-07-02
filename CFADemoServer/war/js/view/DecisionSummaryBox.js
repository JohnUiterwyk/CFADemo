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
function DecisionSummaryBox(game)
{
    this.game = game;
    this.kineticGroup = new Kinetic.Group();
    this.fireBoxBar = new BoxBar(game);
    this.waterBoxBar = new BoxBar(game);
    this.waterIcon = null;
    this.fireIcon = null;
    this.bgRect = null;
    this.settings = null;
}
DecisionSummaryBox.prototype.initialize = function(settings)
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
    var titleText = new Kinetic.Text({
        x: 10,
        y: 10,
        width:settings.width-20,
        text: settings.title,
        fontSize: 16,
        fontStyle: 'bold',
        fontFamily: 'Oswald',
        fill: "#666666"
    });
    this.kineticGroup.add(titleText);

    this.fireIcon = new Kinetic.Image({
        x: 10,
        y: 23+settings.boxHeight/2,
        image: this.game.images.getImage("iconSmallFire"),
        width:16,
        height:22
    });
    this.kineticGroup.add(this.fireIcon);

    this.waterIcon = new Kinetic.Image({
        x: 10,
        y: 33+settings.boxHeight/2+settings.boxHeight,
        image: this.game.images.getImage("iconSmallWater"),
        width:16,
        height:22
    });
    this.kineticGroup.add(this.waterIcon);


    this.fireBoxBar.initialize({
        x:36,
        y:35,
        width: 185,
        height: settings.boxHeight,
        player: 'fire',
        mouseEnabled: false
    });
    this.kineticGroup.add(this.fireBoxBar.kineticGroup);

    this.waterBoxBar.initialize({
        x:36,
        y:45+settings.boxHeight,
        width: 185,
        height: settings.boxHeight,
        player: 'water',
        mouseEnabled: false
    });
    this.kineticGroup.add(this.waterBoxBar.kineticGroup);


}
DecisionSummaryBox.prototype.update = function(model)
{

    var fireQuestionData = model.data['fire']['q'+this.settings.decisionId];
    var waterQuestionData = model.data['water']['q'+this.settings.decisionId];
    if(this.settings.decisionId != 2)
    {
        this.fireBoxBar.fillSelect(fireQuestionData);
        this.waterBoxBar.fillSelect(waterQuestionData);
    }else
    {
        this.fireBoxBar.multiSelect(fireQuestionData);
        this.waterBoxBar.multiSelect(waterQuestionData);

    }
}
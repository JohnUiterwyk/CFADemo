/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 10:49 PM
 * To change this template use File | Settings | File Templates.
 */
function DecisionSelectBox(game)
{
    this.game = game;
    this.kineticGroup = new Kinetic.Group();
    this.boxBar = new BoxBar(game);
    this.bgRect = null;
    this.settings = null;
}
DecisionSelectBox.prototype.initialize = function(settings)
{
    this.settings = settings;
    this.kineticGroup.setPosition(settings.x,settings.y);
    this.addBackground(settings.width,settings.height);
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

    //Description
    var descText = new Kinetic.Text({
        x: 10,
        y: 40,
        width:settings.width-20,
        text: settings.description,
        fontSize: 14,
        fontFamily: 'Oswald',
        fill: "#666666"
    });
    this.kineticGroup.add(descText);

    this.boxBar.initialize({
        x:10,
        y:settings.height/2,
        width: 210,
        height: 40,
        player: settings.player,
        mouseEnabled: true,
        selectCallback:this.onSelect.bind(this)
    });
    this.kineticGroup.add(this.boxBar.kineticGroup);

    var minText = new Kinetic.Text({
        x: 10,
        y: settings.height/2+50,
        text: settings.minText,
        fontSize: 12,
        fontFamily: 'Oswald',
        fill: '#666666',
        width:100,
        align:'left'
    });
    var maxText = new Kinetic.Text({
        x: 125,
        y: settings.height/2+50,
        text: settings.maxText,
        fontSize: 12,
        fontFamily: 'Oswald',
        fill: '#666666',
        width:100,
        align:'right'
    });
    this.kineticGroup.add(minText);
    this.kineticGroup.add(maxText);

}
DecisionSelectBox.prototype.onSelect = function(id)
{
    this.game.model.sendDecision(this.settings.player,this.settings.decisionId,[id]);
    console.log("got "+id);
    //this.kineticGroup.draw();
}
DecisionSelectBox.prototype.addBackground = function(width, height)
{
    this.bgRect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: width,
        height: height,
        fillLinearGradientStartPoint: [0, 0],
        fillLinearGradientEndPoint: [0, height],
        fillLinearGradientColorStops: [0, "rgba(255,255,255,.8)", 1, "rgba(255,255,255,0)"]

    });
    this.kineticGroup.add(this.bgRect);
}
DecisionSelectBox.prototype.addText = function(text,size,color,x,y)
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
DecisionSelectBox.prototype.update = function(model)
{

     var sel = model[this.settings.player][this.settings.decisionId][0];
    this.boxBar.fillSelect(sel);
}
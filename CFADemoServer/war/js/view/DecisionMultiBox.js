/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/7/13
 * Time: 2:13 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 10:49 PM
 * To change this template use File | Settings | File Templates.
 */
function DecisionMultiBox(game)
{
    this.game = game;
    this.kineticGroup = new Kinetic.Group();
    this.bgRect = null;
    this.settings = null;
    this.buttons = [];
}
DecisionMultiBox.prototype.initialize = function(settings)
{
    this.settings = settings;
    this.kineticGroup.setPosition(settings.x,settings.y);

    //Background
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

    //Options
    for(var i=0;i<settings.options.length;i++)
    {
        var line = new Kinetic.Line({
            points: [10,80+i*40,220,80+i*40],
            stroke: '#666666',
            strokeWidth: 1
        });
        this.kineticGroup.add(line);

        if(i<settings.options.length)
        {
            var optionText = new Kinetic.Text({
                x: 50,
                y: 85+i*40,
                width:settings.width-70,
                text: settings.options[i],
                fontSize: 14,
                fontFamily: 'Oswald',
                fill: "#666666"
            });
            this.kineticGroup.add(optionText);

            var selectButton = new SelectButton();
            selectButton.initialize({
                id:i,
                x:10,
                y: 85+i*40,
                player: settings.player,
                selectCallback:this.onSelect.bind(this),
                mouseEnabled:true
            })
            this.kineticGroup.add(selectButton.kineticGroup);
        }   this.buttons.push(selectButton);
    }

}
DecisionMultiBox.prototype.onSelect = function(id)
{
//    var selection = [];
//    for(var i = 0; i < this.buttons.length;i++)
//    {
//        if(this.buttons[i].selected)
//        {
//            selection.push(i+1);
//        }
//    }
    this.game.model.setQuestionOption(this.settings.player,this.settings.decisionId,id,this.buttons[id].selected);
    console.log("got button "+id+" set to "+this.buttons[id].selected);
    //this.kineticGroup.draw();
}
DecisionMultiBox.prototype.update = function(model)
{
    var questionData = model.data[this.settings.player]["q"+this.settings.decisionId];
    for(var i = 0; i < this.buttons.length;i++)
    {
        if(questionData['option'+i] == 1)
        {
            this.buttons[i].setSelected(true);
        }else
        {
            this.buttons[i].setSelected(false);
        }
    }
}
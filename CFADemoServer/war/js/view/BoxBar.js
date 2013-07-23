/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 10:54 PM
 * This is a class to create 5 segement boxes.
 */
function BoxBar(game)
{
    this.game = game;
    this.kineticGroup = new Kinetic.Group();
    this.bgRect = null;
    this.colorOne = null;
    this.colorTwo = null;
    this.colorStroke = null;
    this.selectBoxes = [];
    this.settings =null;
    this.selected = -1;
    this.selArray = [0];
}
BoxBar.prototype.initialize = function(settings)
{
    this.settings = settings;
    this.kineticGroup.setPosition(settings.x,settings.y)
    switch(settings.player)
    {
        case "fire":
            this.colorOne = '#f79c88';
            this.colorTwo = '#e31b23';
            this.colorStroke = '#e31b23';
            break;
        case "water":
            this.colorOne = '#72cdf4';
            this.colorTwo = '#00abdf';
            this.colorStroke = '#00abdf';
            break;
        case "council":
            this.colorOne = '#ffe49d';
            this.colorTwo = '#fdbb30';
            this.colorStroke = '#ad8505';
            break;
    }
    this.bgRect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: settings.width,
        height: settings.height,
        stroke: this.colorStroke,
        strokeWidth: 1,
        fill: '#ffffff',
        cornerRadius: 3
    });
    this.kineticGroup.add(this.bgRect);
    for(var i =1;i<5;i++)
    {
        var xLoc = i*settings.width/5;
        this.addLine(this.colorStroke,[xLoc,0,xLoc,settings.height]);
    }
    for(var i =0;i<5;i++)
    {
       var boxWidth = settings.width/5;
       var selectBox = this.getSelectBox(i*boxWidth,0,boxWidth,settings.height);
       if(settings.mouseEnabled)
       {
           selectBox.on('mousedown touchstart',this.onSelect.bind(this))
       }
       this.kineticGroup.add(selectBox);
       this.selectBoxes.push(selectBox);
    }


}
BoxBar.prototype.onSelect = function(event)
{
    var target = event.targetNode;
    var id = this.selectBoxes.indexOf(target);
    this.fillSelect(id);
    this.settings.selectCallback(id);
}
BoxBar.prototype.fillSelect = function(id)
{
    if (this.selected != id)
    {
        this.selected = id;
        for (var i = 0; i < 5; i++) {
            if (i <= id) {
                this.selectBoxes[i].setOpacity(1);
            } else {
                this.selectBoxes[i].setOpacity(0);
            }

        }
        this.kineticGroup.draw();
    }
}
BoxBar.prototype.multiSelect = function(questionData)
{
	var count = 0;
    for(var i = 0; i < this.selectBoxes.length;i++)
    {
        if(questionData['option'+i]==1)
        {
        	count++;
            //this.selectBoxes[i].setOpacity(1);
        }else
        {
            //this.selectBoxes[i].setOpacity(0);
        }
    }
    this.fillSelect(count-1);
    //this.kineticGroup.draw();
}
BoxBar.prototype.setSelected = function(id)
{
    if (this.selected != id)
    {
        this.selected = id;
        for (var i = 0; i < 5; i++) {
            if (i == id) {
                this.selectBoxes[i].setOpacity(1);
            } else {
                this.selectBoxes[i].setOpacity(0);
            }

        }
        this.kineticGroup.draw();
    }
}
BoxBar.prototype.getSelectBox = function(x,y,width,height)
{

    var box = new Kinetic.Rect({
        x: x,
        y: y,
        width: width,
        height: height,
        stroke: this.colorStroke,
        strokeWidth: 1,
        fillLinearGradientStartPoint: [0, 0],
        fillLinearGradientEndPoint: [0, height],
        fillLinearGradientColorStops: [0, this.colorOne,.5, this.colorTwo,1,this.colorOne],
        cornerRadius: 3,
        opacity:0
    });
    return box;
}

BoxBar.prototype.addLine = function(color,points)
{
    var line = new Kinetic.Line({
        points: points,
        stroke: color,
        strokeWidth: 1
    });
    this.kineticGroup.add(line);
}
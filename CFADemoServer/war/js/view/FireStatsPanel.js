/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 7:42 PM
 * To change this template use File | Settings | File Templates.
 */
function FireStatsPanel(game)
{
    this.game = game;
    this.panel = new Kinetic.Layer();
    this.bgRect = null;
    this.buildingText = null;
    this.currentIcon = null;
    this.buildingIcons = [];

}
FireStatsPanel.prototype.initialize = function()
{
    this.panel.setPosition(160,20);
    //draw background 560x180
    this.addBackground();
    this.addText();
    for(var i = 1; i<=5;i++)
    {
        var icon = this.getBuildingIcon("fireBuilding"+i,340,30);
        this.buildingIcons.push(icon);
    }
    this.showIcon(0);

}

FireStatsPanel.prototype.addBackground = function()
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
FireStatsPanel.prototype.addText = function()
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

    var text = "The hills around Belleville have stunning views, " +
        "but there are few roads in and out. While these areas are " +
        "highly desirable for those wanting a natural lifestyle, " +
        "there are serious concerns about safety in the fire season.";

    this.buildingText.setText(text);
    this.panel.add(this.buildingText);
}
FireStatsPanel.prototype.getBuildingIcon= function(id,x,y)
{
    var icon = new Kinetic.Image({
        x: x,
        y: y,
        image: this.game.images.getImage(id),
        width:187,
        height:109
    });
    return icon;
}

FireStatsPanel.prototype.update = function(model)
{
    this.showIcon(model.fire[1][0]);
}

FireStatsPanel.prototype.showIcon = function(id)
{
    if(this.currentIcon != null)
    {
        this.currentIcon.remove();
    }
    if(id >=0 && id<5)
    {
        this.currentIcon =  this.buildingIcons[id];
        this.panel.add(this.currentIcon);
    }
    this.panel.draw();

}
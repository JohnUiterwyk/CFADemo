/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 7:42 PM
 * To change this template use File | Settings | File Templates.
 */
function WaterStatsPanel(game)
{
    this.game = game;
    this.panel = new Kinetic.Layer();
    this.bgRect = null;
    this.buildingText = null;
    this.currentIcon = null;
    this.buildingIcons = [];
    this.initialized = false;

}
WaterStatsPanel.prototype.initialize = function()
{
    if(!this.initialized)
    {
        this.panel.setPosition(160,20);
        //draw background 560x180
        this.addBackground();
        this.addText();
        for(var i = 1; i<=5;i++)
        {
            var icon = this.getBuildingIcon("waterBuilding"+i,340,30);
            this.buildingIcons.push(icon);
        }
        this.showIcon(0);
        this.initialized = true;
    }

}

WaterStatsPanel.prototype.addBackground = function()
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
WaterStatsPanel.prototype.addText = function()
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

    var text = "A small river runs through Belleville. Close to the river," +
        " the land is quite flat and there is a history of flooding. At rare " +
        "times the flooding can be very extensive.";

    this.buildingText.setText(text);
    this.panel.add(this.buildingText);
}
WaterStatsPanel.prototype.getBuildingIcon= function(id,x,y)
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

WaterStatsPanel.prototype.update = function(model)
{
    this.showIcon(model.data.water.q1);
}

WaterStatsPanel.prototype.showIcon = function(id)
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
/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/7/13
 * Time: 2:33 AM
 * To change this template use File | Settings | File Templates.
 */
function SelectButton()
{
    this.kineticGroup = new Kinetic.Group();
    this.tickOff = null;
    this.tickOn = null;
    this.selected = false;
    this.colorOne = null;
    this.colorTwo = null;
    this.settings = null;
}
SelectButton.prototype.initialize = function(settings)
{
    this.settings = settings;
    this.kineticGroup.setPosition(settings.x,settings.y);
    switch(settings.player)
    {
        case "fire":
            this.colorOne = '#f79c88';
            this.colorTwo = '#e31b23';
            break;
        case "water":
            this.colorOne = '#72cdf4';
            this.colorTwo = '#00abdf';
            break;
    }
    this.tickOff = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 32,
        height: 32,
        stroke: this.colorTwo,
        strokeWidth: 2,
        fill:"#ffffff",
        cornerRadius: 3,
        opacity:1
    });

    this.tickOn = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 32,
        height: 32,
        stroke: this.colorTwo,
        strokeWidth: 2,
        fillLinearGradientStartPoint: [0, 0],
        fillLinearGradientEndPoint: [0, 32],
        fillLinearGradientColorStops: [0, this.colorOne,.5, this.colorTwo,1,this.colorOne],
        cornerRadius: 3,
        opacity:0
    });
    this.kineticGroup.add(this.tickOff);
    this.kineticGroup.add(this.tickOn);
    if(settings.mouseEnabled)
    {
        this.kineticGroup.on('mousedown touchstart',this.onSelect.bind(this))
    }
}
SelectButton.prototype.onSelect = function(event)
{
    var target = event.targetNode;
    this.setSelected(!this.selected);
    this.settings.selectCallback();
}
SelectButton.prototype.setSelected = function(value)
{
    if(this.selected != value)
    {
        this.selected = value;
          if(this.selected)
          {
              this.tickOn.setOpacity(1);
          }else
          {
              this.tickOn.setOpacity(0);
          }
        this.kineticGroup.draw();
    }
}
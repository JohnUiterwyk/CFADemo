function SpectatorStatsPanel(game)
{
    this.game = game;
    this.panel = new Kinetic.Layer();
    this.bgRect = null;
    this.populationText = null;
    this.housePriceText = null;
    this.densityIcons = [];
    this.budgetGraph = new CouncilBudgetGraph(game);
}

SpectatorStatsPanel.prototype.update = function(model)
{
    console.log('updateing stats kineticGroup');
    this.populationText.setText(model.stats.population);
    this.housePriceText.setText(model.stats.housePrice);
    for(var i=0;i<this.densityIcons.length;i++)
    {
        if(i<=model.stats.houseDensity)
        {
            this.densityIcons[i].setOpacity(1);
        }else
        {
            this.densityIcons[i].setOpacity(.5);
        }
    }
    this.budgetGraph.update(model);
    this.panel.draw();
}

SpectatorStatsPanel.prototype.initialize = function()
{
    this.panel.setPosition(160,20);
    //draw background 560x180
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

    this.createPopulationGroup(20,10);
    this.createHousePriceGroup(200,10);
    this.createHouseDensityGroup(200,80);
    this.budgetGraph.initialize(380,10);
    this.panel.add(this.budgetGraph.kineticGroup);

}
SpectatorStatsPanel.prototype.createPopulationGroup = function(x,y)
{
    this.populationGroup =  new Kinetic.Group({
        x:x,
        y:y
    });
    var title = new Kinetic.Text({
        x: 0,
        y: 0,
        text: 'Population',
        fontSize: 14,
        fontFamily: 'Oswald',
        fill: '#5b5600'
    });
    this.populationGroup.add(title);
    this.populationGroup.add(this.getStatBox(0,20));
    var icon = new Kinetic.Image({
        x: 5,
        y: 25,
        image: this.game.images.getImage("iconPopulation"),
        width:25,
        height:27
    });
    this.populationGroup.add(icon);
    this.populationText = new Kinetic.Text({
        x: 45,
        y: 30,
        text: '19,500',
        fontSize: 20,
        fontFamily: 'Oswald',
        fill: '#5b5600'
    });

    this.populationGroup.add(this.populationText);
    this.panel.add(this.populationGroup);
}
SpectatorStatsPanel.prototype.createHousePriceGroup = function(x,y)
{
    this.housePriceGroup =  new Kinetic.Group({
        x:x,
        y:y
    });
    var title = new Kinetic.Text({
        x: 0,
        y: 0,
        text: 'Average house price',
        fontSize: 14,
        fontFamily: 'Oswald',
        fill: '#5b5600'
    });
    this.housePriceGroup.add(title);
    this.housePriceGroup.add(this.getStatBox(0,20));
    var icon = new Kinetic.Image({
        x: 5,
        y: 25,
        image: this.game.images.getImage("iconHousePrice"),
        width:25,
        height:27
    });
    this.housePriceGroup.add(icon);
    this.housePriceText = new Kinetic.Text({
        x: 45,
        y: 30,
        text: '460,000',
        fontSize: 20,
        fontFamily: 'Oswald',
        fill: '#5b5600'
    });

    this.housePriceGroup.add(this.housePriceText);
    this.panel.add(this.housePriceGroup);
}
SpectatorStatsPanel.prototype.createHouseDensityGroup = function(x,y)
{
    this.houseDensityGroup =  new Kinetic.Group({
        x:x,
        y:y
    });
    var title = new Kinetic.Text({
        x: 0,
        y: 0,
        text: 'Housing density',
        fontSize: 14,
        fontFamily: 'Oswald',
        fill: '#5b5600'
    });
    this.houseDensityGroup.add(title);
    this.houseDensityGroup.add(this.getStatBox(0,20));

    for(var i = 0; i<5;i++)
    {
        var icon = this.getHouseIcon(i*30+5,30);
        this.densityIcons.push(icon);
        this.houseDensityGroup.add(icon);
    }
    this.panel.add(this.houseDensityGroup);
}
SpectatorStatsPanel.prototype.getHouseIcon= function(x,y)
{
    var icon = new Kinetic.Image({
        x: x,
        y: y,
        image: this.game.images.getImage("iconHouse"),
        width:25,
        height:20
    });
    return icon;
}

SpectatorStatsPanel.prototype.getStatBox = function(x,y)
{
    var rect = new Kinetic.Rect({
        x: x,
        y: y,
        width: 160,
        height: 40,
        stroke: '#5b5600',
        strokeWidth: 2,
        fillLinearGradientStartPoint: [0, 0],
        fillLinearGradientEndPoint: [0, 40],
        fillLinearGradientColorStops: [0, "#ffffff", 1, "#c1d82f"],
        cornerRadius: 10
    });

    return rect;
}

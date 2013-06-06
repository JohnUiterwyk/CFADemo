function GameMap(game)
{
    this.name = "GameMap";
    this.game = game;

    this.background = new Kinetic.Layer();
    this.overlay = new Kinetic.Layer();


    this.waterSelection = 0;
    this.fireSelection = 0;
    this.player = "";
}

GameMap.prototype.initialize = function()
{
    this.drawBackground();
    this.redrawOverlay();
}
GameMap.prototype.update = function (model)
{
    console.log("updateing map, with fire set to "+ model.fire[0][0]);
    var updated = false;
    if(this.fireSelection != model.fire[0][0])
    {
        this.fireSelection = model.fire[0][0];
        updated = true;
    }
    if(this.waterSelection != model.water[0][0])
    {
        this.waterSelection = model.water[0][0];
        updated = true;
    }
    if(this.player != model.player)
    {
        this.player = model.player.valueOf();
        updated = true;
    }
    if(updated == true) this.redrawOverlay();

}
GameMap.prototype.drawBackground = function()
{

    this.background.removeChildren();
    var left = new Kinetic.Image({
        x: 0,
        y: 0,
        image: this.game.images.getImage("left1"),
        width: 441 ,
        height: 984
    });
    var right = new Kinetic.Image({
        x: 440,
        y: 0,
        image: this.game.images.getImage("right1"),
        width: 584,
        height: 984
    });
    this.background.add(left);
    this.background.add(right);
    this.background.draw();

}

GameMap.prototype.redrawOverlay = function()
{
    console.log("redrawing map overlay");
    this.overlay.removeChildren();
    var selection;
    if(this.waterSelection > 0 )
    {
        selection = this.waterSelection +1;
        var left = new Kinetic.Image({
            x: 0,
            y: 0,
            image: this.game.images.getImage("left"+selection),
            width: 440,
            height: 984
        });
        this.overlay.add(left);
    }
    if(this.fireSelection > 0 )
    {
        selection = this.fireSelection +1;
        var right = new Kinetic.Image({
            x: 440,
            y: 0,
            image: this.game.images.getImage("right"+selection),
            width: 584,
            height: 984
        });
        this.overlay.add(right);
    }
    if(this.player != "")
    {
        var icon = new Kinetic.Image({
            x: 0,
            y: 0,
            image: this.game.images.getImage(this.player+"Icon"),
            width: 140,
            height: 160
        });
        this.overlay.add(icon);
    }
    this.overlay.draw();
}


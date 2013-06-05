function GameMap()
{
    this.name = "GameMap";

    this.queue = new createjs.LoadQueue(true,"images/map/");
    this.imageManifest= [
        {src:"1024_map_left_01.jpg", id:"left1"},
        {src:"1024_map_left_02.png", id:"left2"},
        {src:"1024_map_left_03.png", id:"left3"},
        {src:"1024_map_left_04.png", id:"left4"},
        {src:"1024_map_left_05.png", id:"left5"},
        {src:"1024_map_right_01.jpg", id:"right1"},
        {src:"1024_map_right_02.png", id:"right2"},
        {src:"1024_map_right_03.png", id:"right3"},
        {src:"1024_map_right_04.png", id:"right4"},
        {src:"1024_map_right_05.png", id:"right5"},
    ];


    this.background = new Kinetic.Layer();
    this.overlay = new Kinetic.Layer();
    this.currentLeftOverlay = 0;
    this.currentRightOverlay = 0;
}

GameMap.prototype.initialize = function()
{
    stage.add(this.background);
    stage.add(this.overlay);

    this.queue.addEventListener("complete",this.imageLoadComplete.bind(this));
    this.queue.loadManifest(this.imageManifest);
}
GameMap.prototype.imageLoadComplete = function(event)
{
    //setup bg
    console.log("map bg loaded. and this is "+this.name);

    this.drawBackground();
    //$("#gameCanvas").get(0).getContext('2d').drawImage(img,0,0,440,964,0,0,window.innerWidth/2,window.innerHeight);

}
GameMap.prototype.setFireRestriction = function (level)
{

}
GameMap.prototype.redrawOverlay = function()
{

}
GameMap.prototype.drawBackground = function()
{
    var left = new Kinetic.Image({
        x: 0,
        y: 0,
        image: this.queue.getResult("left1"),
        width: 440,
        height: 984
    });
    var right = new Kinetic.Image({
        x: 440,
        y: 0,
        image: this.queue.getResult("right1"),
        width: 584,
        height: 984
    });
    this.background.add(left);
    this.background.add(right);
    this.background.draw();

}


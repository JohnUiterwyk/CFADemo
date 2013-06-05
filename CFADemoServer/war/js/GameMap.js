function GameMap()
{
    this.name = "GameMap";
    this.imageManifest= [
        {src:"1024_map_left_01.jpg", id:"bgLeft"},
        {src:"1024_map_right_01.jpg", id:"bgRight"},
    ];

    //set the map canvas to be the size of the window

}

GameMap.prototype.initialize = function()
{
//    $("#mapBgCanvas")
//        .attr('width', $(window).innerWidth())
//        .attr('height', $(window).innerHeight());
//
//    console.log("initializing map");
//
//    this.mapImages.bgLeft.onload = this.onImageLoad.bind(this);
//    this.mapImages.bgLeft.onerror = function()
//    {
//        console.log("error loading image.");
//    }
//    this.mapImages.bgLeft.src = this.bgLeftSrc;
    this.loadImages();

}
GameMap.prototype.loadImages = function()
{
    var queue = new createjs.LoadQueue(true,"images/map/");
    queue.addEventListener("complete",this.imageLoadComplete.bind(this));
    queue.loadManifest(this.imageManifest);
}
GameMap.prototype.imageLoadComplete = function(event)
{
    console.log("map bg loaded. and this is "+this.name);
    //$("#mapBgCanvas").get(0).getContext('2d').drawImage(this.mapImages.bgLeft,0,0,440,964,0,0,window.innerWidth/2,window.innerHeight);

}


function ImageLoader(game)
{
    this.game = game;
    this.queue = new createjs.LoadQueue(true,"images/");
    this.setManifest();
    this.notifyComplete = null;
}

ImageLoader.prototype.setOnComplete = function(callback)
{
    this.notifyComplete = callback;
}
ImageLoader.prototype.load = function()
{

    this.queue.addEventListener("complete",this.loadComplete.bind(this));
    this.queue.addEventListener("progress",this.loadProgress.bind(this));
    this.queue.addEventListener("error",this.loadError.bind(this));
    this.queue.loadManifest(this.imageManifest);
}
ImageLoader.prototype.loadError = function(event)
{
    console.log(event.error);
}
ImageLoader.prototype.loadProgress = function(event)
{
    var p = event.progress*100;
    $("#preloadProgress").width(p+"%");
}
ImageLoader.prototype.loadComplete = function(event)
{
    $("#preloadContainer").hide();
    this.notifyComplete();
}
ImageLoader.prototype.getImage = function(id)
{
    return this.queue.getResult(id);
}
ImageLoader.prototype.getKineticImage = function(id,x,y,width,height)
{
    var result = new Kinetic.Image({
        x: x,
        y: y,
        image: this.getImage(id),
        width: width,
        height: height
    });
    return result;
}
ImageLoader.prototype.setManifest = function()
{
    this.imageManifest= [
        {src:"intro/2048_water_icon.png", id:"waterIcon"},
        {src:"intro/2048_fire_icon.png", id:"fireIcon"},
        {src:"intro/2048_council_icon.png", id:"councilIcon"},
        {src:"intro/2048_belleville_icon.png", id:"spectatorIcon"},
        {src:"map/2048_map_left_01.jpg", id:"left1"},
        {src:"map/1024_map_left_02.png", id:"left2"},
        {src:"map/1024_map_left_03.png", id:"left3"},
        {src:"map/1024_map_left_04.png", id:"left4"},
        {src:"map/1024_map_left_05.png", id:"left5"},
        {src:"map/2048_map_right_01.jpg", id:"right1"},
        {src:"map/1024_map_right_02.png", id:"right2"},
        {src:"map/1024_map_right_03.png", id:"right3"},
        {src:"map/1024_map_right_04.png", id:"right4"},
        {src:"map/1024_map_right_05.png", id:"right5"},
        {src:"player/2048_building_icon_fire_01.png", id:"fireBuilding1"},
        {src:"player/2048_building_icon_fire_02.png", id:"fireBuilding2"},
        {src:"player/2048_building_icon_fire_03.png", id:"fireBuilding3"},
        {src:"player/2048_building_icon_fire_04.png", id:"fireBuilding4"},
        {src:"player/2048_building_icon_fire_05.png", id:"fireBuilding5"},
        {src:"player/2048_building_icon_water_01.png", id:"waterBuilding1"},
        {src:"player/2048_building_icon_water_02.png", id:"waterBuilding2"},
        {src:"player/2048_building_icon_water_03.png", id:"waterBuilding3"},
        {src:"player/2048_building_icon_water_04.png", id:"waterBuilding4"},
        {src:"player/2048_building_icon_water_05.png", id:"waterBuilding5"},
        {src:"player/2048_button_NEXT_blue.png", id:"buttonNextBlue"},
        {src:"player/2048_button_NEXT_red.png", id:"buttonNextRed"},
        {src:"player/2048_button_NEXT_yellow.png", id:"buttonNextYellow"},
        {src:"player/2048_icon_house.png", id:"iconHouse"},
        {src:"player/2048_icon_house_price.png", id:"iconHousePrice"},
        {src:"player/2048_icon_population.png", id:"iconPopulation"},
        {src:"player/2048_icon_small_council.png", id:"iconSmallCouncil"},
        {src:"player/2048_icon_small_fire.png", id:"iconSmallFire"},
        {src:"player/2048_icon_small_water.png", id:"iconSmallWater"}
    ];
}
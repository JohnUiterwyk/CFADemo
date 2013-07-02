function GameClient()
{
    this.name = "GameClient" ;

    this.model = new GameModel(this);
    this.images = new ImageLoader(this);

    this.intro = new IntroController(this);
    this.navBar = new NavBarController(this);
    this.gameView = new GameView(this);

    this.timeOut = null;

}
GameClient.prototype.initialize = function()
{
    this.onWindowResize();
    $(window).resize(this.onWindowResizeDelayed.bind(this));

    this.intro.initialize();
    this.navBar.initialize();
    this.model.setChangeListener(this.onModelUpdated.bind(this));

    this.images.setOnComplete(this.onImageLoadComplete.bind(this));
    this.images.load();
}
GameClient.prototype.onImageLoadComplete = function()
{
    //images are loaded so we can init the game view
    this.gameView.initialize();
    this.intro.showTeamButtons();
    this.loadIntro();
    //this.loadPlayer("fire");
}
GameClient.prototype.loadIntro = function()
{
    this.intro.show();
    this.navBar.hideButtons();
    this.gameView.hide();
    //this.model.stopUpdateTimer();
}
GameClient.prototype.loadPlayer = function(player)
{
    this.intro.hide();
    this.navBar.showButtons();
    this.gameView.showPlayer(player);
    this.gameView.show();

    //this.model.startUpdateTimer();
    this.model.setPlayer(player);
    this.gameView.update(this.model);
    this.onWindowResizeDelayed();

}
GameClient.prototype.onWindowResizeDelayed = function()
{
    if (this.timeOut != null)
    {
        clearTimeout(this.timeOut);
    }
    this.timeOut = setTimeout(this.onWindowResize.bind(this), 500);

}
GameClient.prototype.onWindowResize = function()
{
    var stageWidth =  $(window).innerWidth() ;
    var stageHeight =  Math.max($(window).innerHeight(),768*stageWidth/1024) ;
    //var stageWidth = 1024;
    //var stageHeight = 768;
    console.log("window resize to " + stageWidth +" x "+stageHeight);


    var canvas =  $("#gameDiv");
    canvas.attr('width', stageWidth);
    canvas.attr('height', stageHeight);


    if (typeof this.stage === 'undefined' || this.stage == null)
    {
        this.stage = new Kinetic.Stage({
            container: 'gameDiv',
            width: stageWidth,
            height: stageHeight,
            y:40
        });
    }else
    {
        this.stage.setWidth(stageWidth);
        this.stage.setHeight(stageHeight);
    }
    //change this so it scales when well for wide screens 
    this.stage.setScale(stageWidth/1024);
    this.stage.draw();
}

GameClient.prototype.onModelUpdated = function()
{
     console.log("model was updated, here we are in game client");
    this.gameView.update(this.model);
}

var gameClient = new GameClient();
$(document).ready(gameClient.initialize());

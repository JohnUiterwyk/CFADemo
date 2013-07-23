/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/5/13
 * Time: 9:50 PM
 * To change this template use File | Settings | File Templates.
 */
function GameModel(game)
{
    this.game = game;
    this.player = "";
    this.data =
    {
        fire:
        {
            q0:-1,
            q1:-1,
            q2:{
                option0:0,
                option1:0,
                option2:0,
                option3:0,
                option4:0
            }
        },
        water:
        {
            q0:-1,
            q1:-1,
            q2:{
                option0:0,
                option1:0,
                option2:0,
                option3:0,
                option4:0
            }
        },
        council:
        {
            q0:-1,
            q1:-1,
            q2:-1
        }
    };
    this.stats =
    {
        population:19102,
        housePrice:460000,
        houseDensity:3,
        income:4.5,
        expenses:5.5
    }
//    this.dataChanged = false;
//    this.updateInterval = 1000;
//    this.updateEnabled = false;
    this.notifyListener;
    this.xhr = null;
    this.fireDataRef = new Firebase('https://cfademo.firebaseio.com/');
    this.fireDataRef.on('value',this.onUpdate.bind(this));
}

GameModel.prototype.setChangeListener = function(callback)
{
    this.notifyListener = callback;
}
GameModel.prototype.setQuestion = function(player,questionNum,value)
{
     this.fireDataRef.child(player+'/'+'q'+questionNum).set(value);
}
GameModel.prototype.setQuestionOption = function(player,questionNum,optionNum,value)
{

    if(value === true)
    {
        this.fireDataRef.child(player+'/q'+questionNum+'/option'+optionNum).set(1);

    } else
    {
        this.fireDataRef.child(player+'/q'+questionNum+'/option'+optionNum).set(0);
    }
}
GameModel.prototype.onUpdate = function(snapshot)
{

    this.data = snapshot.val();
    this.calcStats();
    this.notifyListener();
}
GameModel.prototype.reset = function()
{
    this.data =
    {
        fire:
        {
            q0:-1,
            q1:-1,
            q2:{
                option0:0,
                option1:0,
                option2:0,
                option3:0,
                option4:0
            }
        },
        water:
        {
            q0:-1,
            q1:-1,
            q2:{
                option0:0,
                option1:0,
                option2:0,
                option3:0,
                option4:0
            }
        },
        council:
        {
            q0:-1,
            q1:-1,
            q2:-1
        }
    };
    if(this.player == 'spectator')
    {
        this.fireDataRef.set(this.data);
    } else
    {
        this.fireDataRef.child(this.player).set(this.data[this.player]);
    }
}
GameModel.prototype.setPlayer = function(player)
{
    this.player = player;
    this.notifyListener();
}


GameModel.prototype.calcStats = function ()
{
    var gFireSafeArea = 250; //ha (all areas open to residential development)
    var gWaterSafeArea = 250; //ha (all areas open to residential development)

    var gHousingArea = gFireSafeArea + gWaterSafeArea; //ha (all areas open to residential development)
    var gHousingDensity = 0; //dwellings/ha
    var gDwellings = 0; //35 dwellings/ha
    var gBaseExpenditure = 10000000; //change this according to infrastructure needs, etc.
    var gBaseHouseCost = 300000; //dollars : increases depending on protection, etc.
    var gFireProtection = 10000;
    var gWaterProtection = 10000;
    var gDeveloperFee = 0; //dollars
    var gHouseCost = gBaseHouseCost + gFireProtection + gWaterProtection + gDeveloperFee;
    var gPeoplePerDwelling = 2.5; //should be a constant. DON'T MAKE THIS ZERO!
    var gRates = 0; //dollars per year
    var gRateIncome = 0; //dollars = population * rates / gPeoplePerDwelling
    var gDesirability = 2.5; //measure of how attractive area is to live in. Multiplies gDwellings to get population
    var gPopulation = 0; //people (affected by housing cost, etc). gDesirability * dwellings
    var gExpenses = 0;

    var values = [250, 180, 110, 80, 50];
    var index = this.data.fire.q0;
    if(index>=0)gFireSafeArea = values[index];

    values = [0, 20000, 60000, 80000, 100000];
    index = this.data.fire.q1;
    if(index>=0)gFireProtection = values[index];

    for (var i = 0; i < 5; i++)
    {
        if (this.data.fire.q2['option' + i] == 1)
        {
            gExpenses += 200000;
        }
    }

    values = [250, 200, 160, 130, 70];
    index = this.data.water.q0;
    if(index>=0)gWaterSafeArea = values[index];

    values = [0, 20000, 40000, 60000, 90000];
    index = this.data.water.q1;
    if(index>=0)gWaterProtection = values[index];

    for (var i = 0; i < 5; i++) {
        if (this.data.water.q2['option' + i] == 1) {
            gExpenses += 200000;
        }
    }

    values = [150, 300, 600, 800, 1000];
    index = this.data.council.q0;
    if(index>=0)gRates = values[index];

    values = [5, 15, 30, 45, 60];
    index = this.data.council.q1;
    if(index>=0)gHousingDensity = values[index];
    if(index>=0)gExpenses *= (index + 5) / 10;

    values = [0, 20000, 60000, 80000, 100000];
    index = this.data.council.q2;
    if(index>=0)gDeveloperFee = values[index];

    gHouseCost = gBaseHouseCost + gFireProtection + gWaterProtection + gDeveloperFee;
    gHousingArea = gFireSafeArea + gWaterSafeArea;
    gDwellings = gHousingDensity * gHousingArea;
    gPopulation = gDwellings * gDesirability;
    gRateIncome = (gPopulation / gPeoplePerDwelling) * gRates + 100000;
    this.stats.houseDensity = this.data.council.q1;
    this.stats.income = Math.min(gRateIncome / 2000000, 10);
    this.stats.population = gPopulation;
    this.stats.housePrice = gHouseCost;
    this.stats.expenses = gExpenses / 900000;
}

//
//GameModel.prototype.parseUpdate = function(json)
//{
//
//    //console.log("XHR update received");
//    //console.log(JSON.stringify(json,null,4));
//    for(var i=0;i<json.length;i++)
//    {
//        this.setDecision(json[i].playerId,json[i].decisionId,json[i].selection);
//
//    }
//    //console.log("parse update complete. GameModel:");
//    if(this.dataChanged)
//    {
//        //console.log(JSON.stringify(this,null,4));
//        this.calcStats();
//        this.dataChanged = false;
//        this.notifyListener();
//    }
//}
//GameModel.prototype.setDecision = function(playerId,decisionId,selection)
//{
//    if(playerId == "fire" || playerId == "water" || playerId == "council")
//    {
//        if(selection.length == 0)
//        {
//            selection = [0];
//        }
//        if(!this[playerId][decisionId].compare(selection))
//        {
//            this.dataChanged = true;
//            this[playerId][decisionId] = selection;
//        }
//    }
//}
//
//GameModel.prototype.sendDecision = function(playerId,decisionId,selection)
//{
//
//    this.xhr.abort();
//    var selString ="";
//    if(selection.length > 0)
//    {
//        selString+=selection[0].toString();
//    }
//    for(var i = 1;i<selection.length;i++)
//    {
//        selString += ":"+selection[i].toString();
//    }
//    console.log("sending p="+playerId+" d="+decisionId+" s="+selString);
//    $.ajax({
//        type: "POST",
//        url: "/game",
//        data: {
//            playerId:playerId,
//            decisionId:decisionId,
//            selection:selString
//
//        },
//        success: this.parseUpdate.bind(this),
//        dataType: 'json'
//    });
//    //this.setDecision(playerId,decisionId,selection);
//    //this.notifyListener();
//    //this.dataChanged = false;
//}
//

//GameModel.prototype.stopUpdateTimer = function()
//{
//    this.updateEnabled = false;
//    clearTimeout(this.doUpdateXHR.bind(this));
//}
//GameModel.prototype.startUpdateTimer = function()
//{
//    this.updateEnabled = true;
//    setTimeout(this.doUpdateXHR.bind(this),this.updateInterval);
//}
//
//GameModel.prototype.doUpdateXHR = function()
//{
//    //console.log("doing model update XHR");
//    this.xhr = $.getJSON("/game",this.parseUpdate.bind(this));
//    if(this.updateEnabled)
//    {
//        setTimeout(this.doUpdateXHR.bind(this),this.updateInterval);
//    }
//}
//

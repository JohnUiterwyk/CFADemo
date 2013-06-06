/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 9:03 PM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/6/13
 * Time: 7:42 PM
 * To change this template use File | Settings | File Templates.
 */
function WaterDecisionPanel(game)
{
    this.game = game;
    this.panel = new Kinetic.Layer();
    this.bgRect = null;
    this.decisionOne = new DecisionSelectBox(game);
    this.decisionTwo = new DecisionSelectBox(game);
    this.decisionThree = new DecisionMultiBox(game);
    //this.decitionThree =

}
WaterDecisionPanel.prototype.initialize = function()
{
    this.panel.setPosition(768,0);
    //draw background 560x180
    this.addBackground();
    this.decisionOne.initialize({
        x:10,
        y:20,
        width: 230,
        height: 160,
        decisionId:0,
        title:"Residential Zoning".toUpperCase(),
        description:"Decide the allowable area for development.",
        minText:"No restrictions",
        maxText:"Severely restricted",
        player:"water"

    });
    this.decisionTwo.initialize({
        x:10,
        y:200,
        width: 230,
        height: 160,
        decisionId:1,
        title:"Building Regulation".toUpperCase(),
        description:"Decide on level of flood protection standards.",
        minText:"Low protection",
        maxText:"High protection",
        player:"water"

    });
    this.decisionThree.initialize({
        x:10,
        y:380,
        width: 230,
        height: 295,
        decisionId:2,
        title:"Infrastructure".toUpperCase(),
        description:"Choose the fire mitigation features that council will need to provide. ",
        options:[
            "Build overflow channels and catchments",
            "Build levies around residential areas",
            "Stockpile sandbags and mobile levies",
            "Establish water-absorbing areas on river bank",
            "Flood education workshops"
        ],
        player:"water"
    })
    this.panel.add(this.decisionOne.kineticGroup);
    this.panel.add(this.decisionTwo.kineticGroup);
    this.panel.add(this.decisionThree.kineticGroup);

}

WaterDecisionPanel.prototype.addBackground = function()
{
    this.bgRect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 256,
        height: 708,
        fill:"rgba(255,255,255,.5)",
        shadowColor:"#000000",
        shadowOpacity:.5,
        shadowOffsetX:-5



    });
    this.panel.add(this.bgRect);
}
WaterDecisionPanel.prototype.update = function(model)
{
    this.decisionOne.update(model);
    this.decisionTwo.update(model);
    this.decisionThree.update(model);
}
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
function CouncilDecisionPanel(game)
{
    this.game = game;
    this.panel = new Kinetic.Layer();
    this.bgRect = null;
    this.decisionOne = new DecisionSelectBox(game);
    this.decisionTwo = new DecisionSelectBox(game);
    this.decisionThree = new DecisionSelectBox(game);
    //this.decitionThree =

}
CouncilDecisionPanel.prototype.initialize = function()
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
        title:"Rates".toUpperCase(),
        description:"Set annual rates for residences.",
        minText:"$100",
        maxText:"$1000",
        player:"council"

    });
    this.decisionTwo.initialize({
        x:10,
        y:200,
        width: 230,
        height: 160,
        decisionId:1,
        title:"Housing Density".toUpperCase(),
        description:"Decide how dense the housing will be. People per hectare:",
        minText:"Low (2.5)",
        maxText:"High (500)",
        player:"council"

    });

    this.decisionThree.initialize({
        x:10,
        y:380,
        width: 230,
        height: 180,
        decisionId:2,
        title:"Building Regulation".toUpperCase(),
        description:"Fees help pay for infrastructure. The cost will pass to property buyers. Fee per block:",
        minText:"$20k",
        maxText:"$100k",
        player:"council"

    });
    this.panel.add(this.decisionOne.kineticGroup);
    this.panel.add(this.decisionTwo.kineticGroup);
    this.panel.add(this.decisionThree.kineticGroup);

}

CouncilDecisionPanel.prototype.addBackground = function()
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
CouncilDecisionPanel.prototype.update = function(model)
{
    this.decisionOne.update(model);
    this.decisionTwo.update(model);
    this.decisionThree.update(model);
}
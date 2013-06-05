/**
 * Created with JetBrains WebStorm.
 * User: johnuiterwyk
 * Date: 6/4/13
 * Time: 5:24 PM
 * To change this template use File | Settings | File Templates.
 */
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}
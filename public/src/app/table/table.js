SVG.on(document, 'DOMContentLoaded', function() {
    console.log("in the script")
    var draw = SVG('drawing').size(640, 356);
    var rect = draw.rect(640, 356).attr({ fill: '#022b6d' });
    
    $("#drawing").click(function(e){
        var parentOffset = $(this).offset();
        var relX = e.pageX - parentOffset.left - 105;
        var relY = e.pageY - parentOffset.top;
        console.log(relX, relY);
        draw.circle(10).attr({
            cx: relX,
            cy: relY,
            fill: '#fff'
        });
    });
});
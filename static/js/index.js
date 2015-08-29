var socket = io();

socket.on('hola', function(contador){
    $("p").html("contador " + contador);
});

window.onload = function(){

    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d");
        var canvas = oCanvas.create({
        canvas: "#canvas",
        background: "#FF1A4C"
    });
    canvas.width = 360;
    canvas.height = 511;

    var pulsado;
    var radio = 50;

    var movimientos = new Array();

var imagen = canvas.display.ellipse({
    x: 177,
    y: 135,
    radius: radio,
    fill: "#0aa"
});

var imagen2 = canvas.display.ellipse({
    x: 177,
    y: 250,
    radius: radio,
    fill: "#ccc"
});

    canvas.addChild(imagen);
    canvas.addChild(imagen2); 
    imagen.dragAndDrop();
    imagen2.dragAndDrop();

    canvas.bind('mousedown', function(e){
        pulsado = true;
        //console.log(canvas.mouse.x);
        //console.log(canvas.mouse.y);
        socket.emit('mover', [canvas.mouse.x, canvas.mouse.y,false]);
    });
    canvas.bind('mousemove', function(){
        if (pulsado == true){
            socket.emit('mover', [canvas.mouse.x, canvas.mouse.y, false]);
        }else{};
    });
    canvas.bind('mouseup', function(){
        pulsado = false;
    });
    canvas.bind('mouseleave', function(){
        pulsado = false;
    });

    var drawing = function(mov){
        movimientos.push(mov);
        for (var i = 0; i < movimientos.length; i++) {
            //console.log(movimientos[i]);
            canvas.redraw();
            if (movimientos[i][2] && i){
                canvas.moveTo(movimientos[i-1][0], movimientos[i-1][1]);
            }else{
                canvas.moveTo(movimientos[i][0], movimientos[i][1]);
            };
            canvas.lineTo(movimientos[i][0], movimientos[i][1]);
            //ctx.closePath();
        };
    }

    socket.on('update',function(movimientos){
        drawing(movimientos);
    });

} //function global.

function guardar(){
 mydata = canvas.toDataURL({});
 mydata = mydata.replace("image/png",'image/octet-stream');
 document.location.href = mydata;
}
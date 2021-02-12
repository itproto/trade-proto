
var WebSocketServer = require("ws").Server;
let userId;
var wss = new WebSocketServer({server: serv});
    wss.on("connection", );

function connectHandler(ws){

    console.info("websocket connection open");

    var timestamp = new Date().getTime();
    userId = timestamp;

    ws.send(JSON.stringify({msgType:"onOpenConnection", msg:{connectionId:timestamp}}));


    ws.on("message", function (data, flags) {
        console.log("websocket received a message");
        var clientMsg = data;

        ws.send(JSON.stringify({msg:{connectionId:userId}}));
    });

    ws.on("close", function () {
        console.log("websocket connection close");
    });
}
}
var express = require("express");
var app = express();
app.use(express.static("public"));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8080);

// tạo kết nối giữa client và server
io.on("connection", function (socket) {
    socket.on("disconnect", function () {
    });
    //server lắng nghe dữ liệu từ client
    socket.on("Client-sent-data", function (data) {
        //sau khi lắng nghe dữ liệu, server phát lại dữ liệu này đến các client khác
        io.emit("Server-sent-data", data);


        console.log(data);
    });
});

// create route, display view

app.get("/", function (req, res) {
    res.render("homepage");
});

var express = require('express');
var app = express();
require('./server/config/mongoose')
var session = require('express-session');
app.use(session({
    secret: 'srdtfyguh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

const flash = require('express-flash');
app.use(flash());

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
// Require path
var path = require('path');
// Setting our Static Folder Directory
// app.use(express.static(path.join(__dirname, './client/static')));

app.use(express.static(path.join(__dirname, './public/dist/public')));

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './client/views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// Routes
// require('./server/config/user_routes.js')(app)
// require('./server/config/tenrec_routes.js')(app)
// require('./server/config/cake_routes.js')(app)
require('./server/config/pet_routes.js')(app)
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

app.listen(8000, function () {
    console.log("listening on port 8000");
})

const server = app.listen(1337, function () {
    console.log("socket listening on port 1337");
});
const io = require('socket.io')(server);

var numClicks = 0;
io.on('connection', function (socket) { //2
    console.log("connected")
    socket.on("message", function(data){
        console.log("******************* here")
        console.log(data)
        socket.emit("message",{msg: `server got message: ${data}`})
    })
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('Pushing_epic_button', function (data) {
        numClicks += 1
        console.log("numClicks: ", numClicks); //8 (note: this log will be on your server's terminal)
        io.emit('updated_count', { numClicks: numClicks });
    });

    socket.on('Pushing_reset_button', function (data) {
        numClicks = 0
        console.log("numClicks: ", numClicks); //8 (note: this log will be on your server's terminal)
        io.emit('updated_count', { numClicks: numClicks });
    });
    socket.emit('message',{ msg: 'emit new from server' })

});
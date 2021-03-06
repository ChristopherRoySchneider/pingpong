var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/angular_belt_exam', { useNewUrlParser: true });

var path = require('path');
var fs = require('fs');


// // create a variable that points to the models folder
var models_path = path.join(__dirname, './../models');
// // read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(models_path + '/' + file)();
    }
})
var mongoose = require('mongoose')

var pets = require('../controllers/pets.js')
module.exports = function (app) {
    app.get('/pets', function (req, res) {
        pets.find_all(req, res);
    })
    app.get('/pets/:petid', function (req, res) {
        pets.get_by_id(req, res);
    })
    app.post('/pets', function (req, res) {
        pets.new(req, res);
    })
    app.put('/pets/:petid', function (req, res) {
        pets.edit(req, res);
    })

    app.delete('/pets/:petid', function (req, res) {
        pets.remove(req, res);
    })

    app.get('/pets/:petid/like', function (req, res) {
        pets.like(req, res);
    })

  

    

}
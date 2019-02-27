var mongoose = require('mongoose')

var matches = require('../controllers/matches.js')
module.exports = function (app) {
    app.get('/matches', function (req, res) {
        matches.find_all(req, res);
    })
    app.get('/matches/:matchid', function (req, res) {
        matches.get_by_id(req, res);
    })
    app.post('/matches', function (req, res) {
        matches.new(req, res);
    })
    app.put('/matches/:matchid', function (req, res) {
        matches.edit(req, res);
    })

    app.delete('/matches/:matchid', function (req, res) {
        matches.remove(req, res);
    })

    app.get('/matches/:matchid/like', function (req, res) {
        matches.like(req, res);
    })

    app.post('/matches/:matchid/games', function (req, res) {
        matches.add_game(req, res);
    })

    app.post('/matches/:matchid/games/:gameid/gameevents', function (req, res) {
        matches.new_game_event(req, res);
    })
    app.get('/matches/:matchid/games/:gameid', function (req, res) {
        matches.get_game_by_id(req, res);
    })

  

    

}
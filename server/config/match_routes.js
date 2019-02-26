var mongoose = require('mongoose')

var matchs = require('../controllers/matchs.js')
module.exports = function (app) {
    app.get('/matchs', function (req, res) {
        matchs.find_all(req, res);
    })
    app.get('/matchs/:matchid', function (req, res) {
        matchs.get_by_id(req, res);
    })
    app.post('/matchs', function (req, res) {
        matchs.new(req, res);
    })
    app.put('/matchs/:matchid', function (req, res) {
        matchs.edit(req, res);
    })

    app.delete('/matchs/:matchid', function (req, res) {
        matchs.remove(req, res);
    })

    app.get('/matchs/:matchid/like', function (req, res) {
        matchs.like(req, res);
    })

    app.post('/matchs/:matchid/games', function (req, res) {
        matchs.new_game(req, res);
    })

    

    app.post('/matchs/:matchid/games/:gameid/gameevents', function (req, res) {
        matchs.new_game_event(req, res);
    })

  

    

}
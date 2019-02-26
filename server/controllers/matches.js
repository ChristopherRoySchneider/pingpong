var mongoose = require('mongoose')
var Match = mongoose.model('Match') // We are retrieving this Schema from our Models, named 'tenrec'
var Game = mongoose.model('Game')
var GameEvent = mongoose.model('GameEvent')
module.exports = {
    find_all: function (req, res) {
        Match.find({}, function (err, match) {
            if (err) {
                console.log('something went wrong');
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                // console.log('got all matches:', match);
                res.json({ message: "Success", data: match })
            }
        }).sort('-_id')
    },
    new: function (req, res) {
        // console.log(req)
        var newMatch = new Match();
        newMatch.player1 = req.body.player1;
        newMatch.player2 = req.body.player2; 
        
        newMatch.save(function (err) {
            if (err) {
                console.log('error saving new user: ',err);
                
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('new match:', newMatch);
                
                res.json({ message: "Success", data: newMatch })
            }
            
        })
    },
    add_game: function (req, res) {
        // console.log("POST DATA", req.body);
        Match.findOne({ _id: req.params.matchid }, function (err, match) {
            var newGame = new Game()
            
            var first_game_event = new GameEvent()
            first_game_event.type = "game_start"
            newGame.game_events.push(first_game_event)
            match.games.push(newGame)
            console.log("!!!!!!!!!!!!!!",req.params)
            match.save(function (err) {
                if (err) {
                    console.log('Post Errors:', err.errors);
                    res.json({ message: "Error", error: err })
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('successfully added a game!');
                    res.json({ message: "Success",  })
                }
            })
        })
    },
    get_by_id: function (req, res) {
        Match.find({_id:req.params.matchid}, function (err, p_by_name) {
            if (err) {
                console.log('something went wrong');
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('got matches by name:', p_by_name);
                res.json({ message: "Success", data: p_by_name })
            }
        })
    },
    edit: function (req, res) {
        // console.log("POST DATA", req.body);
        Match.findOne({ _id: req.params.matchid }, function (err, match) {
            match.player1 = req.body.player1;
            match.player2 = req.body.player2;          
            match.save(function (err) {
                if (err) {
                    console.log('Post Errors:', err.errors);
                    res.json({ message: "Error", error: err })
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('successfully added a match!');
                    res.json({ message: "Success",  })
                }
            })
        })
    },


    remove: function (req, res) {
        Match.deleteOne({_id:req.params.matchid}, function (err) {
            if (err) {
                console.log('something went wrong');
                res.json({ message: "Error", error: err })
            } else { // else console.log that we did well and then redirect to the root route
                console.log('!!!!!!!!!!!!!!!deleted match by id:',req.params.matchid );
                res.json({ message: "Success" })
            }
        })
    },

    like: function (req, res) {
        // console.log("POST DATA", req.body);
        Match.findOne({ _id: req.params.matchid }, function (err, match) {
            match.likes +=1
            
          
            
            match.save(function (err) {
                if (err) {
                    console.log('Post Errors:', err.errors);
                    res.json({ message: "Error", error: err })
                } else { // else console.log that we did well and then redirect to the root route
                    console.log('successfully liked a match!');
                    res.json({ message: "Success",  })
                }
            })
        })
    },
    


}
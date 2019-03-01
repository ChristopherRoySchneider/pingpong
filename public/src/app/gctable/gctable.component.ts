import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../http.service";
import { SocketService } from "../socket.service";
import SVG from "svg.js";
import { Match, Game } from "../models/match";

@Component({
  selector: "app-gctable",
  templateUrl: "./gctable.component.html",
  styleUrls: ["./gctable.component.css"]
})
export class GctableComponent implements OnInit {
  constructor(private _http: HttpService, private _socket: SocketService) {}

  @Input("match") match: Match;
  @Input("gameIndex") gameIndex: any;

  scoreTypesArray = [
    "ace",
    "backhand",
    "block",
    "chop",
    "drop",
    "flick",
    "forehand",
    "hit",
    "kill",
    "lob",
    "loop",
    "out",
    "push",
    "serve",
    "smash"
  ];

  nonScoreTypesArray = [
    "Let",
    "Service Change",
    "P1 Wins Game",
    "P2 Wins Game",
    "P1 Wins Match",
    "P2 Wins Match"
  ];

  draw: any;
  table: any;
  centerLine: any;
  net: any;
  ball: any;
  target: any;
  parent: any;

  x: number;
  y: number;

  gameId: any;
  errors: [];

  newGameEventObj = {
    scorer: "",
    p1_points_scored: 0,
    p2_points_scored: 0,
    type: "",
    x: 0,
    y: 0,
    eventType: ""
  };

  ngOnInit() {
    this.makeTable();
    // console.log("gameIndex",this.gameIndex)
    this.newGameEventObj.p1_points_scored = this.match.games[this.gameIndex][
      "p1_points_scored"
    ];
    this.newGameEventObj.p2_points_scored = this.match.games[this.gameIndex][
      "p2_points_scored"
    ];
    this.drawPreviousBalls(this.match.games[this.match.games.length-1]);
  }
  ngOnChanges(){
    this.newGameEventObj.p1_points_scored=this.match.games[this.gameIndex]['p1_points_scored']
    this.newGameEventObj.p2_points_scored=this.match.games[this.gameIndex]['p2_points_scored']
  }

  makeTable() {
    this.draw = SVG("drawing").size(640, 356);
    this.table = this.draw.rect(640, 356).attr({
      fill: "#022b6d",
      stroke: "#fff",
      "stroke-width": 10
    });
    this.centerLine = this.draw.line([[0, 178], [640, 178]]).stroke({
      color: "#fff",
      width: 5
    });
    this.net = this.draw.line([[320, 0], [320, 356]]).stroke({
      color: "#fff",
      width: 5
    });
  }

  populateGameEvent(event: MouseEvent) {
    this.target = <HTMLInputElement>event.target;
    this.parent = this.target.getBoundingClientRect();
    this.newGameEventObj.x = event.clientX - this.parent.left;
    this.newGameEventObj.y = event.clientY - this.parent.top;
    this.newGameEventObj.scorer = this.determineScorer(this.newGameEventObj.x);
    this.ball = this.draw.circle(10).attr({
      cx: this.newGameEventObj.x,
      cy: this.newGameEventObj.y,
      fill: "#fff"
    });
  }

  postAndEmitGameEvent() {
    this.newGameEventObj.eventType = "score";
    this.gameId = this.getGameId(this.match);
    if (this.newGameEventObj.x < 320) {
      this.newGameEventObj.p2_points_scored++;
    } else {
      this.newGameEventObj.p1_points_scored++;
    }
    var updatedGame = this.match.games[this.gameIndex];
    updatedGame.p1_points_scored = this.newGameEventObj.p1_points_scored;
    updatedGame.p2_points_scored = this.newGameEventObj.p2_points_scored;
    this.putGameEvent(this.match._id, this.gameId, this.newGameEventObj);
    this.putGameData(this.match._id, updatedGame);
  }


  submitNonScoringEvent() {
    this.newGameEventObj.eventType = "non-score";
    this.newGameEventObj.x = null;
    this.newGameEventObj.y = null;
    if (this.newGameEventObj.type == "Service Change"){
      this.newGameEventObj.type += " - " + this.newGameEventObj.scorer;
    }
    if (this.newGameEventObj.type == "Let"){
      this.newGameEventObj.type += " - " + this.newGameEventObj.scorer;
    }
    var updatedGame = this.match.games[this.gameIndex];
    this.putGameEvent(this.match._id, this.gameId, this.newGameEventObj);
    if (this.newGameEventObj.type == "P1 Wins Game") {
      updatedGame.winner = "p1";
      updatedGame.game_complete = true;

      this.putGameData(this.match._id, updatedGame);
      this.match.p1_games_won +=1;
      this.putMatch(this.match)
    }
    if (this.newGameEventObj.type == "P2 Wins Game") {
      updatedGame.winner = "p2";
      updatedGame.game_complete = true;
      this.putGameData(this.match._id, updatedGame);
      this.match.p2_games_won +=1;
      this.putMatch(this.match)
    }
    if (this.newGameEventObj.type == "P1 Wins Match") {
      this.match.winner = "p1";
      this.match.match_complete=true;
      this.putMatch(this.match)
    }
    if (this.newGameEventObj.type == "P2 Wins Match") {
      this.match.winner = "p2";
      this.match.match_complete=true;
      this.putMatch(this.match)
    }
  }

  addGame(matchId) {
    let observable = this._http.addGame(matchId, {});
    observable.subscribe(data => {
      console.log("posted data", data);
      if (data["message"] == "Error") {
        console.log("Error saving Match");
        this.errors = data["error"];
        console.log(this.errors);
      } else {
        this.getMatchByIdFromService(this.match["_id"]);
        this.errors = null;
      }
    });
  }
  getMatchByIdFromService(id?: string) {
    let observable = this._http.getMatchById(id);
    observable.subscribe(data => {
      console.log("Got our match by id the new way!", data);
      this.match = data["data"][0];
      console.log("this.matchToEdit", this.match);
    });
  }

  determineScorer(x: number): string {
    if (x < 320) {
      // this.newGameEventObj.p2_points_scored++;
      return this.match.player2;
    } else {
      // this.newGameEventObj.p1_points_scored++;
      return this.match.player1;
    }
  }

  getGameId(match: Match) {
    return match.games[match.games.length - 1]._id;
  }

  putGameEvent(matchId, gameId, newGameEvent) {
    newGameEvent.createdAt = new Date().toISOString();
    newGameEvent.updatedAt = new Date().toISOString();
    // console.log("Event emitted. Sending:", newGameEvent);

    var gameEventdata = {
      gameEvent: newGameEvent,
      matchid: matchId,
      gameid: gameId
    };

    this._http.postGameEvent(matchId, gameId, newGameEvent).subscribe(data => {
      // console.log("put game event", data);

      if (data["message"] == "Error") {
        // console.log("Error saving Match", data);
      } else {
        this._socket.sendGameEvent(gameEventdata);
      }
    });
  }
  putGameData(matchId, updatedGame) {
    console.log("sending updated game data:", updatedGame);

    var gameData = {
      updatedGame: updatedGame,
      matchid: matchId
    };

    this._http.putGame(matchId, updatedGame).subscribe(data => {
      console.log("put game :", data);

      if (data["message"] == "Error") {
        console.log("Error saving Game", data);
      } else {
        this._socket.sendGameChange(gameData);
      }
    });
  }

  drawPreviousBalls(game: Game) {
    console.log('in the drawPreviousBalls function')
    for (let gameEvent of game.game_events) {
      if (gameEvent.x) {
        this.drawBall(gameEvent.x, gameEvent.y);
      }
    }
  }

  drawBall(x: number, y: number) {
    this.x = x;
    this.y = y;
    console.log(this.x, this.x);
    this.ball = this.draw.circle(10).attr({
      cx: this.x,
      cy: this.y,
      fill: '#fff'
    });
  }

  putMatch(updatedMatch) {

    console.log(updatedMatch);
    let observable = this._http.putMatch(updatedMatch);
    observable.subscribe(data => {
      console.log("put match", data);

      if (data['message'] == 'Error') {
        console.log('Error saving Match');
        this.errors = data['error'];
        console.log(this.errors);
      } else {

        this._socket.sendMatchUpdate(updatedMatch);

        this.errors = null;
      }
    });
}}

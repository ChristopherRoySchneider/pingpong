import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from '../http.service';
import { Match } from '../models/match';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _SocketService: SocketService,
  ) { }

  match: Match;
gameIndex=0;
gameEventConnection;
matchUpdateConnection;
  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getMatchByIdFromService(params['matchid']);
    });
    this.gameEventConnection = this._SocketService
      .subscribeGameEvent()
      .subscribe(message => {
        console.log('Recieved Game Event Message:', message);
        this.match['games'].forEach(game => {
          if (message['gameid'] == game._id && game.game_events.filter(function(e) { return e === message['gameEvent']; }).length==0) {
            game.game_events.push(message['gameEvent']);
          }
        });

    });
    this.matchUpdateConnection = this._SocketService.matchChanged().subscribe(matchFromSockets => {
      console.log("match changed: Message:", matchFromSockets);
      if(this.match._id==matchFromSockets['_id']){
      this.match.match_complete = matchFromSockets['match_complete'];
      this.match.p1_games_won = matchFromSockets['p1_games_won'];
      this.match.p2_games_won = matchFromSockets['p2_games_won'];
      this.match.player1 = matchFromSockets['player1'];
      this.match.player2 = matchFromSockets['player2'];
      }
    });
  }

  getMatchByIdFromService(id: string) {
    this._http.getMatchById(id).subscribe(data => {
      this.match = data['data'][0];
      this.gameIndex = this.match.games.length-1;
    });
  }
  setGameIndex(idx:number){
    this.gameIndex=idx;
  }

}

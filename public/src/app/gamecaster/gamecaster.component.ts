import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from '../http.service';
import { Match } from '../models/match';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-gamecaster',
  templateUrl: './gamecaster.component.html',
  styleUrls: ['./gamecaster.component.css']
})
export class GamecasterComponent implements OnInit {

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _SocketService: SocketService,
  ) { }

  match: Match;
  gameIndex = 0;
  connection;
  gameUpdateConnection;
  errors: [];

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getMatchByIdFromService(params['matchid']);
    });
    this.connection = this._SocketService.matchChanged().subscribe(matchFromSockets => {
      // console.log("match changed: Message:", matchFromSockets);
      if(this.match._id==matchFromSockets['_id']){
      this.match.match_complete = matchFromSockets['match_complete'];
      this.match.p1_games_won = matchFromSockets['p1_games_won'];
      this.match.p2_games_won = matchFromSockets['p2_games_won'];
      this.match.player1 = matchFromSockets['player1'];
      this.match.player2 = matchFromSockets['player2'];
      }
    });
    console.log("*** before")
    this.gameUpdateConnection = this._SocketService.getGameChange().subscribe(gameFromSockets => {
      console.log("game changed: Message:", gameFromSockets);
      this.match.games.forEach(game => {
        if(game._id == gameFromSockets['updatedGame']._id){
          console.log("***** got one:", gameFromSockets['updatedGame'])
          game.game_complete = gameFromSockets['updatedGame'].game_complete
        }
      });

    });
    console.log("*** after")
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

  addGame(matchId) {
    let observable = this._http.addGame(matchId,{});
    observable.subscribe(data => {
      console.log('posted data', data);
      if (data['message'] == 'Error') {
        console.log('Error saving Match');
        this.errors = data['error'];
        console.log(this.errors);
      } else {
        this.getMatchByIdFromService1(this.match['_id']);
        this.errors = null;
      }
    });
  }
  getMatchByIdFromService1(id?: string) {
    let observable = this._http.getMatchById(id);
    observable.subscribe(data => {
      console.log('Got our match by id the new way!', data);
      this.match = data['data'][0];
      console.log('this.matchToEdit', this.match);
    });
  }

}

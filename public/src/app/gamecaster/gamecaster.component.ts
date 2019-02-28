import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from '../http.service';
import { Match } from '../models/match';

@Component({
  selector: 'app-gamecaster',
  templateUrl: './gamecaster.component.html',
  styleUrls: ['./gamecaster.component.css']
})
export class GamecasterComponent implements OnInit {

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute
  ) { }
  
  match: Match;

  // gameStateData = {
  //   matchId: '',
  //   gameIndex: 0,
  //   gameIndexString: '',
  //   player1: '',
  //   player2: '',
  //   matchWinner: null,
  //   matchComplete: false,
  //   gameComplete: false,
  //   gameWinner: null,
  //   p1MatchPoints: 0,
  //   p2MatchPoints: 0,
  //   p1GamePoints: 0,
  //   p2GamePoints: 0,
  //   scorer: '',
  //   type: '',
  //   x: 0,
  //   y: 0
  // }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getMatchByIdFromService(params['matchid']);
    });
  }

  getMatchByIdFromService(id: string) {
    this._http.getMatchById(id).subscribe(data => {
      this.match = data['data'][0];
    });
  }

  // mapGameStateData(match: Match) {
  //   this.gameStateData.matchId = match._id;
  //   this.gameStateData.gameIndex = match.games.length-1;
  //   this.gameIndexToString(this.gameStateData.gameIndex);
  //   this.gameStateData.player1 = this.match.player1;
  //   this.gameStateData.player2 = this.match.player2;
  //   this.gameStateData.matchWinner = this.match.winner;
  //   this.gameStateData.matchComplete = this.match.match_complete;
  //   this.gameStateData.gameComplete = this.match.games[this.match.games.length-1].game_complete;
  //   this.gameStateData.gameWinner = this.match.games[this.match.games.length-1].winner;
  //   for (let game of this.match.games) {
  //     if (game.winner === this.match.player1) {
  //       this.gameStateData.p1MatchPoints++;
  //     }
  //     else if (game.winner === this.match.player2) {
  //       this.gameStateData.p2MatchPoints++;
  //     }
  //   }
  //   const mostRecentGame = this.match.games.length-1
  //   const mostRecentEvent = this.match.games[mostRecentGame].game_events.length-1;
  //   this.gameStateData.p1GamePoints = this.match.games[mostRecentGame].game_events[mostRecentEvent].p1_points_scored;
  //   this.gameStateData.p2GamePoints = this.match.games[mostRecentGame].game_events[mostRecentEvent].p2_points_scored;
  //   console.log('Match:', this.match);
  //   console.log('Game State Data:', this.gameStateData);
  // }

}

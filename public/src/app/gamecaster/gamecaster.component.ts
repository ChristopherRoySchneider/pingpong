import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from '../http.service';

@Component({
  selector: 'app-gamecaster',
  templateUrl: './gamecaster.component.html',
  styleUrls: ['./gamecaster.component.css']
})
export class GamecasterComponent implements OnInit {

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }
  dict = {
    0: "First",
    1: "Second",
    2: "Third",
    3: "Fourth",
    4: "Fifth",
    5: "Sixth",
    6: "Seventh",
    7: "Eighth",
    8: "Ninth",
    9: "Tenth"
  }
  matchId: any;
  match: any;
  gameIndex: number;
  gameIndexString: any;
  
  // matchGameEvent: any = {
  //   gameIndex: 0,
  //   gameIndexString: '',
  //   player1: '',
  //   player2: '',
  //   matchWinner: '',
  //   match_complete: false,
  //   game_complete: false,
  //   gameWinner: '',
  //   p1_points_scored: 0,
  //   scorer: '',
  //   p2_points_scored: 0,
  //   type: '',
  //   x: 0,
  //   y: 0
  // }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.matchId = params['matchid']
      this.getMatchByIdFromService(params["matchid"]);
    });
  }

  getMatchByIdFromService(id?: string) {
    let observable = this._httpService.getMatchById(id);
    observable.subscribe(data => {
      console.log('Got our match by id the new way!', data);
      this.match = data['data'][0];
      this.gameIndex = this.match.games.length - 1;
      this.gameIndexString = this.dict[this.gameIndex];
      console.log('************game index:', this.gameIndex,typeof(this.gameIndex), this.gameIndexString)
      console.log('this.matchToEdit', this.match);
    });
  }


  

}

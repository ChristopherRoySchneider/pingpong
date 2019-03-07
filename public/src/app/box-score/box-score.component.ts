import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box-score',
  templateUrl: './box-score.component.html',
  styleUrls: ['./box-score.component.css']
})
export class BoxScoreComponent implements OnInit {

  constructor() { }
  p1GamesWon=0;
  p2GamesWon=0;
  @Input("match") match: any;

  ngOnInit() {
    this.countGamesWon();
  }
  ngOnChanges() {this.countGamesWon();

  }
  countGamesWon(){
    this.p1GamesWon=0;
    this.p2GamesWon=0;
    for (let game of this.match.games) {

      if (game.winner === "p1") {
        this.p1GamesWon++;
      }
      else if (game.winner === "p2") {
        this.p2GamesWon++;
      }
    }
  }


}

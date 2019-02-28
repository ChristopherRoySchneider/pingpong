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
  @Input() matchData: any;

  ngOnInit() {
    this.countGamesWon();
  }
  countGamesWon(){
    for (let game of this.matchData.games) {
      console.log("*********", game.winner)
      if (game.winner === "p1") {
        this.p1GamesWon++;
      }
      else if (game.winner === "p2") {
        this.p2GamesWon++;
      }
    }
  }
  

}

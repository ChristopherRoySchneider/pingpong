import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Match } from '../models/match';

@Component({
  selector: 'app-glance',
  templateUrl: './glance.component.html',
  styleUrls: ['./glance.component.css']
})
export class GlanceComponent implements OnInit, DoCheck {

  constructor() { }

  translator = {
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

  gameIndexString: string;
  p1GamesWon=0;
  p2GamesWon=0;

  @Input() match: Match;

  ngOnInit() {
    this.countGamesWon();
  }
  ngOnChanges(): void {
    this.countGamesWon();
    if (this.match) {
      this.gameIndexToString(this.match.games.length-1)
    }
  }

  ngDoCheck()	{
    if (this.match) {
      this.gameIndexToString(this.match.games.length-1)
    }
  }

  gameIndexToString(index: number) {
    this.gameIndexString = this.translator[index];
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

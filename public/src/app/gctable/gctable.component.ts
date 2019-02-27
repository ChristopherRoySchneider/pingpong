import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import SVG from 'svg.js';

@Component({
  selector: 'app-gctable',
  templateUrl: './gctable.component.html',
  styleUrls: ['./gctable.component.css']
})
export class GctableComponent implements OnInit {

  constructor( private _http: HttpService ) { }

  draw: any;
  table: any;
  centerLine: any;
  net: any;
  ball: any;
  target: any;
  parent: any;
  @Input() match: any;
  matchGameEvent: any = {
    player1: '',
    player2: '',
    matchWinner: '',
    match_complete: false,
    game_complete: false,
    gameWinner: '',
    p1_points_scored: 0,
    scorer: '',
    p2_points_scored: 0,
    type: '',
    x: 0,
    y: 0
  }

  ngOnInit() {
    this.makeTable();
  }

  makeTable() {
    this.draw = SVG('drawing').size(640, 356)
    this.table = this.draw.rect(640, 356).attr({
      'fill': '#022b6d',
      'stroke': '#fff',
      'stroke-width': 10
    });
    this.centerLine = this.draw.line([[0, 178], [640, 178]]).stroke({
      'color': '#fff',
      'width': 5
    })
    this.net = this.draw.line([[320, 0], [320, 356]]).stroke({
      'color': '#fff',
      'width': 5
    })
  }

  newMatchGameEvent(event: MouseEvent) {
    this.target = <HTMLInputElement>event.target;
    this.parent = this.target.getBoundingClientRect();
    this.matchGameEvent.x = event.clientX - this.parent.left;
    this.matchGameEvent.y = event.clientY - this.parent.top;
    this.matchGameEvent.scorer = this.determineScorer(this.matchGameEvent.x);
    this.ball = this.draw.circle(10).attr({
      cx: this.matchGameEvent.x,
      cy: this.matchGameEvent.y,
      fill: '#fff'
    });
  }

  determineScorer(x: number): string {
    if (x < 178){
      this.matchGameEvent.p1_points_scored++;
      return this.matchGameEvent.player1;
    } else {
      this.matchGameEvent.p2_points_scored++;
      return this.matchGameEvent.player2;
    }
  }
}
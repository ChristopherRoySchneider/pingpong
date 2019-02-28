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

  @Input() gameStateData: any;

  disable = true;

  scoreTypesArray = [
    'ace',
    'backhand',
    'block',
    'chop',
    'drop shot',
    'flick',
    'forehand',
    'hit',
    'kill shot',
    'lob',
    'loop',
    'out',
    'push',
    'serve',
    'smash'
  ];

  nonScoreTypesArray = [
    'New Game',
    'Let'
  ]

  draw: any;
  table: any;
  centerLine: any;
  net: any;
  ball: any;
  target: any;
  parent: any;

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

  newGameEvent(event: MouseEvent) {
    this.toggleDisable();
    this.target = <HTMLInputElement>event.target;
    this.parent = this.target.getBoundingClientRect();
    this.gameStateData.x = event.clientX - this.parent.left;
    this.gameStateData.y = event.clientY - this.parent.top;
    this.gameStateData.scorer = this.determineScorer(this.gameStateData.x);
    this.ball = this.draw.circle(10).attr({
      cx: this.gameStateData.x,
      cy: this.gameStateData.y,
      fill: '#fff'
    });
  }

  toggleDisable() {
    this.disable = !this.disable;
  }

  determineScorer(x: number): string {
    if (x < 320){
      this.gameStateData.p1_points_scored++;
      return this.gameStateData.player2;
    } else {
      this.gameStateData.p2_points_scored++;
      return this.gameStateData.player1;
    }
  }

  createSummaryString(p1GamePoints: number, p2GamePoints) {
    this.gameStateData.p1GamePoints = p1GamePoints;
    this.gameStateData.p2GamePoints = p2GamePoints;
  }
}
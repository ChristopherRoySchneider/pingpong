import { Component, OnInit } from '@angular/core';
import SVG from 'svg.js';

@Component({
  selector: 'app-gctable',
  templateUrl: './gctable.component.html',
  styleUrls: ['./gctable.component.css']
})
export class GctableComponent implements OnInit {

  constructor() { }

  clientX = 0;
  clientY = 0;
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
    this.target = <HTMLInputElement>event.target;
    this.parent = this.target.getBoundingClientRect();
    this.clientX = event.clientX - this.parent.left;
    this.clientY = event.clientY - this.parent.top;
    this.ball = this.draw.circle(10).attr({
      cx: this.clientX,
      cy: this.clientY,
      fill: '#fff'
    });
  }

  determineScorer(x: number) {

  }

}
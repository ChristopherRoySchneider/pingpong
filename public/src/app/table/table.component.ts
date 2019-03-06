import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from "../socket.service";
import SVG from 'svg.js';
import { Match, Game } from '../models/match';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor( private _socket: SocketService ) { }

  @Input('match') match: Match
  @Input('gameIndex') gameIndex: number;
  game: Game;
  gameEvent: any

  gameEventConnection: any;

  x = 0;
  y = 0;
  draw: any;
  table: any;
  centerLine: any;
  net: any;
  ball: any;
  target: any;
  parent: any;

  ngOnInit() {
    this.makeTable();
    this.game = this.match.games[this.gameIndex];
    this.drawPreviousBalls(this.game);
    this.gameEventConnection = this._socket
      .subscribeGameEvent()
      .subscribe(message => {
        console.log('Recieved Game Event Message:', message);

        if (message['gameid'] == this.game._id && this.game.game_events.filter(function(e) { return e === message['gameEvent']; }).length==0) {
          this.game.game_events.push(message['gameEvent']);
        }

        console.log(this.game['game_events']);
        this.gameEvent = this.game.game_events[this.game.game_events.length-1];
        if (this.gameEvent.x) {
          this.drawBall(this.gameEvent.x, this.gameEvent.y);
        }
    });
  }
  ngOnChanges() {
    this.game = this.match.games[this.gameIndex];
    this.drawPreviousBalls(this.game);
  }
  ngOnDestroy() {
    this.gameEventConnection.unsubscribe();
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

  drawPreviousBalls(game: Game) {
    console.log('in the drawPreviousBalls function')
    for (let gameEvent of game.game_events) {
      if (gameEvent.x) {
        this.drawBall(gameEvent.x, gameEvent.y);
      }
    }
  }

  drawBall(x: number, y: number) {
    this.x = x;
    this.y = y;
    console.log(this.x, this.x);
    this.ball = this.draw.circle(10).attr({
      cx: this.x,
      cy: this.y,
      fill: '#fff'
    });
  }

}

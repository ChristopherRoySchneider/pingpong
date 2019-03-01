import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from '../http.service';
import { Match } from '../models/match';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _socket: SocketService,
  ) { }

  match: Match;
<<<<<<< HEAD
  gameIndex = 0;
=======
gameIndex=0;
gameEventConnection;
>>>>>>> origin/master
  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getMatchByIdFromService(params['matchid']);
    });
    this.gameEventConnection = this._socket
      .subscribeGameEvent()
      .subscribe(message => {
        console.log('Recieved Game Event Message:', message);
        this.match['games'].forEach(game => {
          if (message['gameid'] == game._id && game.game_events.filter(function(e) { return e === message['gameEvent']; }).length==0) {
            game.game_events.push(message['gameEvent']);
          }
        });

    });
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

}

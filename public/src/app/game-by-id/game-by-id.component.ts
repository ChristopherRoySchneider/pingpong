import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-game-by-id',
  templateUrl: './game-by-id.component.html',
  styleUrls: ['./game-by-id.component.css']
})
export class GameByIdComponent implements OnInit {
  @Input() gameFromInput:any;
  @Input() matchFromInput:any;

  matchId=null;
  gameId=null;
  match={};
  game={};
  gameEvents=[];
  newGameEvent={"p1_points_scored": 0, "p2_points_scored": 0, "type": "game_start"};
  gameEventConnection;

  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _SocketService: SocketService,) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params["matchid"]);
      this.matchId = params['matchid']
      this.gameId = params['gameid']
      this.getMatchByIdFromService(this.matchId);
      this.getGameByIdFromService(this.matchId,this.gameId );

      this.gameEventConnection = this._SocketService.subscribeGameEvent().subscribe(message => {
        console.log("recieved getMessage in this.connection , pushed to AppComponent this.messages.  Message:", message);
        this.game['game_events'].push(message);
        console.log(this.game['game_events'])
      });
    });
  }
  getMatchByIdFromService(id?: string) {
    let observable = this._httpService.getMatchById(id);
    observable.subscribe(data => {
      console.log('Got our match by id the new way!', data);
      this.match = data['data'][0];
      console.log('this.matchToEdit', this.match);
    });
  }
  getGameByIdFromService(matchid, gameid) {
    let observable = this._httpService.getGameById(matchid,gameid);
    observable.subscribe(data => {
      console.log('Got our game by id the new way!', data);
      this.game = data['game'];
      console.log('this.matchToEdit', this.match);
    });
  }
  putGameEvent(matchid, gameid,newgameevent){
    console.log("button pushed, sending:",newgameevent)
    let observable = this._httpService.postGameEvent(matchid, gameid,newgameevent);
    observable.subscribe(data => {
      console.log("put game event", data);

      if (data['message'] == 'Error') {
        console.log('Error saving Match', data);

      } else {
        this._SocketService.sendGameEvent(newgameevent);
      }
    });


  }
}

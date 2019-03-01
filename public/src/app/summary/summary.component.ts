
import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../http.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { SocketService } from "../socket.service";


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  gameEventConnection;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _SocketService: SocketService) { }

  @Input('match') match: any;
  @Input('gameIndex') gameIndex: any;




  ngOnInit() {

    this.gameEventConnection = this._SocketService
        .subscribeGameEvent()
        .subscribe(message => {
          console.log("recieved gameevent  Message:", message);
          this.match.games.forEach(game => {

            console.log("game",game)
          if (message["gameid"] == game._id) {
            game.game_events.push(message["gameEvent"]);
            game.game_events.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
          }
        });
          // console.log(this.game["game_events"]);
        });
        this.match.games[this.gameIndex].game_events.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  }

}

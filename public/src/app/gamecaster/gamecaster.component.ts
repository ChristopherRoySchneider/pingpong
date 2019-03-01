import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { HttpService } from '../http.service';
import { Match } from '../models/match';
import { tick } from '@angular/core/testing';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-gamecaster',
  templateUrl: './gamecaster.component.html',
  styleUrls: ['./gamecaster.component.css']
})
export class GamecasterComponent implements OnInit {

  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _SocketService: SocketService,
  ) { }

  match: Match;
  gameIndex=0;
  connection;


  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getMatchByIdFromService(params['matchid']);

    });
    this.connection = this._SocketService.matchChanged().subscribe(message => {
      console.log("match changed: Message:", message);

    });


  }

  getMatchByIdFromService(id: string) {
    this._http.getMatchById(id).subscribe(data => {
      this.match = data['data'][0];
    });
  }


}

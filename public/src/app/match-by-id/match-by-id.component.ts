import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from '../http.service';

@Component({
  selector: 'app-match-by-id',
  templateUrl: './match-by-id.component.html',
  styleUrls: ['./match-by-id.component.css']
})
export class MatchByIdComponent implements OnInit {
likedThisMatch=false;
matchId=null;
match={};
errors=[];
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params["matchid"]);
      this.matchId = params['matchid']
      this.getMatchByIdFromService(params["matchid"]);
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
  addGame(matchId) {
    let observable = this._httpService.addGame(matchId,{});
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of matches is assigned to the key 'matches' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      if (data['message'] == 'Error') {
        console.log('Error saving Match');
        this.errors = data['error'];
        console.log(this.errors);
      } else {
        // this._router.navigate(['/']);
        this.errors = null;
      }
    });
  }
  deleteMatch(id: string): void {
    let observable = this._httpService.deleteMatch(id);
    observable.subscribe(data => {
      console.log('deleted item', data);
      console.log(`delete match by id ${id}`);
      this._router.navigate(['/']);
    });
  }

}

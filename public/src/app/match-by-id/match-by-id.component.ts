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
match={};
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params["id"]);

      this.getMatchByIdFromService(params["id"]);
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
  deleteMatch(id: string): void {
    let observable = this._httpService.deleteMatch(id);
    observable.subscribe(data => {
      console.log('deleted item', data);
      console.log(`delete match by id ${id}`);
      this._router.navigate(['/']);
    });
  }
  likeMatch(id: string): void {
    let observable = this._httpService.likeMatch(id);
    observable.subscribe(data => {
      console.log("liked match with id: ",id, data);
      this.likedThisMatch=true;
      this.getMatchByIdFromService(id)
    });
  }
}

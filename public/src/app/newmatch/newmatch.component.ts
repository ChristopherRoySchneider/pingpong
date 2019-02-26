import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newmatch',
  templateUrl: './newmatch.component.html',
  styleUrls: ['./newmatch.component.css']
})
export class NewmatchComponent implements OnInit {
  newMatch = {};
  newGame = {};
  errors = null;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log('params', params);
    });
  }
  addMatch(newMatch) {
    console.log(newMatch);
    let observable = this._httpService.addMatch(newMatch);
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of matches is assigned to the key 'matches' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      if (data['message'] == 'Error') {
        console.log('Error saving Match');
        this.errors = data['error'];
        console.log(this.errors);
      } else {
        this.newMatch = {};
        this._router.navigate(['/']);
        this.errors = null;
      }
    });
  }

}

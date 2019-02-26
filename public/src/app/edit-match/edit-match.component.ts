import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from '../http.service';

@Component({
  selector: "app-edit-match",
  templateUrl: "./edit-match.component.html",
  styleUrls: ["./edit-match.component.css"]
})
export class EditMatchComponent implements OnInit {
  matchID = null;
  errors = null;
  matchToEdit = {};
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params["id"]);
      this.matchID = params["id"];
      this.getMatchByIdFromService(this.matchID);
    });
  }
  putMatch(updatedMatch) {
    console.log(updatedMatch);
    let observable = this._httpService.putMatch(updatedMatch);
    observable.subscribe(data => {
      console.log("put match", data);

      if (data['message'] == 'Error') {
        console.log('Error saving Match');
        this.errors = data['error'];
        console.log(this.errors);
      } else {
        this.matchToEdit = {};
        this._router.navigate([`/view/${updatedMatch._id}`]);
        this.errors = null;
      }
    });
  }
  getMatchByIdFromService(id?: string) {
    let observable = this._httpService.getMatchById(id);
    observable.subscribe(data => {
      console.log('Got our match by id the new way!', data);
      // In this example, the array of matchs is assigned to the key 'matchs' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      this.matchToEdit = data['data'][0];
      console.log('this.matchToEdit', this.matchToEdit);
    });
  }
}

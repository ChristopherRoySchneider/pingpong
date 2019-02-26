import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  newMatch: any;
  title = 'app';
  showMatchEditFormId = null;
  matches = [];
  matchToEdit = {};
  newRating={};
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    console.log('ngOnInit');
    this.getMatchesFromService();
    // this.getMatchByIdFromService();
    this.newMatch = {  };
  }


  getMatchesFromService() {
    let observable = this._httpService.getMatches();
    observable.subscribe(data => {
      console.log('Got our matches the new way!', data);
      // In this example, the array of matches is assigned to the key 'matches' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      this.matches = data['data'];
      console.log('this.matches', this.matches);
    });
  }

  getMatchByIdFromService(id?: string) {
    let observable = this._httpService.getMatchById(id);
    observable.subscribe(data => {
      console.log('Got our match by id the new way!', data);
      // In this example, the array of matches is assigned to the key 'matches' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      this.matchToEdit = data['data'][0];
      console.log('this.matchToEdit', this.matchToEdit);
    });
  }
  onButtonClick(): void {
    this.getMatchesFromService();
    console.log(`Click event is working`);
  }
  onButtonClickMatch(id?: string): void {
    this.getMatchByIdFromService(id);
    console.log(`Click event match by id`);
  }
  showRatingForm(id: string): void {
    this.showMatchEditFormId = id;
    console.log(`Click event showRatingForm`);
  }
  onSubmit(newMatch) {
    console.log(newMatch);
    let observable = this._httpService.addMatch(newMatch);
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of matches is assigned to the key 'matches' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      this.newMatch = { };
      this.getMatchesFromService();
    });
  }

  deleteMatch(id: string): void {
    let observable = this._httpService.deleteMatch(id);
    observable.subscribe(data => {
      console.log('deleted item', data);
      console.log(`delete match by id ${id}`);
      this.getMatchesFromService();
    });
  }
  putMatch(updatedMatch) {
    console.log(updatedMatch);
    let observable = this._httpService.putMatch(updatedMatch);
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of matches is assigned to the key 'matches' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      this.matchToEdit = { };
      this.getMatchesFromService();
    });
  }
  dataFromChild(eventData) {
    console.log('********eventData', eventData);
    console.log('********pre', this.matchToEdit);
    this.matchToEdit = eventData;
    console.log('********post', this.matchToEdit);
    this.getMatchesFromService();
  }

}

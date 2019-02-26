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
  matchs = [];
  matchToEdit = {};
  newRating={};
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    console.log('ngOnInit');
    this.getMatchsFromService();
    // this.getMatchByIdFromService();
    this.newMatch = {  };
  }


  getMatchsFromService() {
    let observable = this._httpService.getMatchs();
    observable.subscribe(data => {
      console.log('Got our matchs the new way!', data);
      // In this example, the array of matchs is assigned to the key 'matchs' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      this.matchs = data['data'];
      console.log('this.matchs', this.matchs);
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
  onButtonClick(): void {
    this.getMatchsFromService();
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
      // In this example, the array of matchs is assigned to the key 'matchs' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      this.newMatch = { };
      this.getMatchsFromService();
    });
  }
  onSubmitRating( newRating, matchId) {
    console.log("*newRating",newRating);
    console.log("*matchId",matchId);

    let observable = this._httpService.addRating(matchId,newRating);
    observable.subscribe(data => {
      console.log('put ', data);

      this.newRating = { };
      this.showMatchEditFormId=null;
      this.getMatchsFromService();
      this.getMatchByIdFromService(matchId);


    });
  }


  deleteMatch(id: string): void {
    let observable = this._httpService.deleteMatch(id);
    observable.subscribe(data => {
      console.log('deleted item', data);
      console.log(`delete match by id ${id}`);
      this.getMatchsFromService();
    });
  }
  putMatch(updatedMatch) {
    console.log(updatedMatch);
    let observable = this._httpService.putMatch(updatedMatch);
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of matchs is assigned to the key 'matchs' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      this.matchToEdit = { };
      this.getMatchsFromService();
    });
  }
  dataFromChild(eventData) {
    console.log('********eventData', eventData);
    console.log('********pre', this.matchToEdit);
    this.matchToEdit = eventData;
    console.log('********post', this.matchToEdit);
    this.getMatchsFromService();
  }

}

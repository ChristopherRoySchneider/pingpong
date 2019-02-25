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
  newPet: any;
  title = 'app';
  showPetEditFormId = null;
  pets = [];
  petToEdit = {};
  newRating={};
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    console.log('ngOnInit');
    this.getPetsFromService();
    // this.getPetByIdFromService();
    this.newPet = {  };
  }


  getPetsFromService() {
    let observable = this._httpService.getPets();
    observable.subscribe(data => {
      console.log('Got our pets the new way!', data);
      // In this example, the array of pets is assigned to the key 'pets' in the data object.
      // This may be different for you, depending on how you set up your Pet API.
      this.pets = data['data'];
      console.log('this.pets', this.pets);
    });
  }

  getPetByIdFromService(id?: string) {
    let observable = this._httpService.getPetById(id);
    observable.subscribe(data => {
      console.log('Got our pet by id the new way!', data);
      // In this example, the array of pets is assigned to the key 'pets' in the data object.
      // This may be different for you, depending on how you set up your Pet API.
      this.petToEdit = data['data'][0];
      console.log('this.petToEdit', this.petToEdit);
    });
  }
  onButtonClick(): void {
    this.getPetsFromService();
    console.log(`Click event is working`);
  }
  onButtonClickPet(id?: string): void {
    this.getPetByIdFromService(id);
    console.log(`Click event pet by id`);
  }
  showRatingForm(id: string): void {
    this.showPetEditFormId = id;
    console.log(`Click event showRatingForm`);
  }
  onSubmit(newPet) {
    console.log(newPet);
    let observable = this._httpService.addPet(newPet);
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of pets is assigned to the key 'pets' in the data object.
      // This may be different for you, depending on how you set up your Pet API.
      this.newPet = { };
      this.getPetsFromService();
    });
  }
  onSubmitRating( newRating, petId) {
    console.log("*newRating",newRating);
    console.log("*petId",petId);

    let observable = this._httpService.addRating(petId,newRating);
    observable.subscribe(data => {
      console.log('put ', data);

      this.newRating = { };
      this.showPetEditFormId=null;
      this.getPetsFromService();
      this.getPetByIdFromService(petId);


    });
  }


  deletePet(id: string): void {
    let observable = this._httpService.deletePet(id);
    observable.subscribe(data => {
      console.log('deleted item', data);
      console.log(`delete pet by id ${id}`);
      this.getPetsFromService();
    });
  }
  putPet(updatedPet) {
    console.log(updatedPet);
    let observable = this._httpService.putPet(updatedPet);
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of pets is assigned to the key 'pets' in the data object.
      // This may be different for you, depending on how you set up your Pet API.
      this.petToEdit = { };
      this.getPetsFromService();
    });
  }
  dataFromChild(eventData) {
    console.log('********eventData', eventData);
    console.log('********pre', this.petToEdit);
    this.petToEdit = eventData;
    console.log('********post', this.petToEdit);
    this.getPetsFromService();
  }

}

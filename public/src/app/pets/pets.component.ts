import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpService } from "../http.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-pets",
  templateUrl: "./pets.component.html",
  styleUrls: ["./pets.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class PetsComponent implements OnInit {
  newPet: any;

  title = "app";
  showPetEditFormId = null;
  pets = [];
  petToEdit = {};
  newRating = {};
  sortAscending = true;
  sortField = "_id";
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    console.log("ngOnInit");
    this.getPetsFromService();
    // this.getPetByIdFromService();
    this.newPet = {};
  }

  getPetsFromService() {
    let observable = this._httpService.getPets();
    observable.subscribe(data => {
      console.log("Got our pets the new way!", data);
      // In this example, the array of pets is assigned to the key 'pets' in the data object.
      // This may be different for you, depending on how you set up your Pet API.
      var temp = data["data"];
      console.log(typeof temp);
      console.log(JSON.stringify(temp));
      if (this.sortAscending) {
        if (this.sortField == "_id") {
          temp = temp.sort((a, b) => (a._id < b._id ? -1 : 1));
        }
        if (this.sortField == "name") {
          temp = temp.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
        }
        if (this.sortField == "type") {
          temp = temp.sort((a, b) => (a.type.toUpperCase() < b.type.toUpperCase() ? -1 : 1));
        }
      } else {
        if (this.sortField == "_id") {
          temp = temp.sort((a, b) => (a._id > b._id ? -1 : 1));
        }
        if (this.sortField == "name") {
          temp = temp.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1));
        }
        if (this.sortField == "type") {
          temp = temp.sort((a, b) => (a.type.toUpperCase() > b.type.toUpperCase() ? -1 : 1));
        }
      }
      console.log(temp);
      this.pets = temp;
      console.log("this.pets", this.pets);
    });
  }

  deletePet(id: string): void {
    let observable = this._httpService.deletePet(id);
    observable.subscribe(data => {
      console.log("deleted item", data);
      console.log(`delete pet by id ${id}`);
      this.getPetsFromService();
    });
  }
  sortByDate(): void {
    this.sortField = "_id";
    this.changeSortOrder();
    this.getPetsFromService();

  }
  sortByName(): void {
    this.sortField = "name";
    this.changeSortOrder();
    this.getPetsFromService();

  }
  sortByType(): void {
    this.sortField = "type";
    this.changeSortOrder();
    this.getPetsFromService();

  }
  changeSortOrder() {
    if (this.sortAscending) {
      this.sortAscending = false;
    } else {
      this.sortAscending = true;
    }
  }
}

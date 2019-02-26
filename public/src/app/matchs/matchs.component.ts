import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpService } from "../http.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-matchs",
  templateUrl: "./matchs.component.html",
  styleUrls: ["./matchs.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class MatchsComponent implements OnInit {
  newMatch: any;

  title = "app";
  showMatchEditFormId = null;
  matchs = [];
  matchToEdit = {};
  newRating = {};
  sortAscending = true;
  sortField = "_id";
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    console.log("ngOnInit");
    this.getMatchsFromService();
    // this.getMatchByIdFromService();
    this.newMatch = {};
  }

  getMatchsFromService() {
    let observable = this._httpService.getMatchs();
    observable.subscribe(data => {
      console.log("Got our matchs the new way!", data);
      // In this example, the array of matchs is assigned to the key 'matchs' in the data object.
      // This may be different for you, depending on how you set up your Match API.
      var temp = data["data"];
      console.log(typeof temp);
      console.log(JSON.stringify(temp));
      // if (this.sortAscending) {
      //   if (this.sortField == "_id") {
      //     temp = temp.sort((a, b) => (a._id < b._id ? -1 : 1));
      //   }
      //   if (this.sortField == "name") {
      //     temp = temp.sort((a, b) => (a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1));
      //   }
      //   if (this.sortField == "type") {
      //     temp = temp.sort((a, b) => (a.type.toUpperCase() < b.type.toUpperCase() ? -1 : 1));
      //   }
      // } else {
      //   if (this.sortField == "_id") {
      //     temp = temp.sort((a, b) => (a._id > b._id ? -1 : 1));
      //   }
      //   if (this.sortField == "name") {
      //     temp = temp.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1));
      //   }
      //   if (this.sortField == "type") {
      //     temp = temp.sort((a, b) => (a.type.toUpperCase() > b.type.toUpperCase() ? -1 : 1));
      //   }
      // }
      console.log(temp);
      this.matchs = temp;
      console.log("this.matchs", this.matchs);
    });
  }

  deleteMatch(id: string): void {
    let observable = this._httpService.deleteMatch(id);
    observable.subscribe(data => {
      console.log("deleted item", data);
      console.log(`delete match by id ${id}`);
      this.getMatchsFromService();
    });
  }
  sortByDate(): void {
    this.sortField = "_id";
    this.changeSortOrder();
    this.getMatchsFromService();

  }
  sortByName(): void {
    this.sortField = "name";
    this.changeSortOrder();
    this.getMatchsFromService();

  }
  sortByType(): void {
    this.sortField = "type";
    this.changeSortOrder();
    this.getMatchsFromService();

  }
  changeSortOrder() {
    if (this.sortAscending) {
      this.sortAscending = false;
    } else {
      this.sortAscending = true;
    }
  }
}

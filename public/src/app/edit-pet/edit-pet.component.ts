import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from '../http.service';

@Component({
  selector: "app-edit-pet",
  templateUrl: "./edit-pet.component.html",
  styleUrls: ["./edit-pet.component.css"]
})
export class EditPetComponent implements OnInit {
  petID = null;
  errors = null;
  petToEdit = {};
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params["id"]);
      this.petID = params["id"];
      this.getPetByIdFromService(this.petID);
    });
  }
  putPet(updatedPet) {
    console.log(updatedPet);
    let observable = this._httpService.putPet(updatedPet);
    observable.subscribe(data => {
      console.log("put pet", data);

      if (data['message'] == 'Error') {
        console.log('Error saving Pet');
        this.errors = data['error'];
        console.log(this.errors);
      } else {
        this.petToEdit = {};
        this._router.navigate([`/view/${updatedPet._id}`]);
        this.errors = null;
      }
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
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { HttpService } from '../http.service';

@Component({
  selector: 'app-pet-by-id',
  templateUrl: './pet-by-id.component.html',
  styleUrls: ['./pet-by-id.component.css']
})
export class PetByIdComponent implements OnInit {
likedThisPet=false;
pet={};
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params["id"]);

      this.getPetByIdFromService(params["id"]);
    });
  }

  getPetByIdFromService(id?: string) {
    let observable = this._httpService.getPetById(id);
    observable.subscribe(data => {
      console.log('Got our pet by id the new way!', data);
      this.pet = data['data'][0];
      console.log('this.petToEdit', this.pet);
    });
  }
  deletePet(id: string): void {
    let observable = this._httpService.deletePet(id);
    observable.subscribe(data => {
      console.log('deleted item', data);
      console.log(`delete pet by id ${id}`);
      this._router.navigate(['/']);
    });
  }
  likePet(id: string): void {
    let observable = this._httpService.likePet(id);
    observable.subscribe(data => {
      console.log("liked pet with id: ",id, data);
      this.likedThisPet=true;
      this.getPetByIdFromService(id)
    });
  }
}

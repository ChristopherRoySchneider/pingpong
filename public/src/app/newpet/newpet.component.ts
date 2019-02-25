import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-newpet',
  templateUrl: './newpet.component.html',
  styleUrls: ['./newpet.component.css']
})
export class NewpetComponent implements OnInit {
  newPet = {};
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
  addPet(newPet) {
    console.log(newPet);
    let observable = this._httpService.addPet(newPet);
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of pets is assigned to the key 'pets' in the data object.
      // This may be different for you, depending on how you set up your Pet API.
      if (data['message'] == 'Error') {
        console.log('Error saving Pet');
        this.errors = data['error'];
        console.log(this.errors);
      } else {
        this.newPet = {};
        this._router.navigate(['/']);
        this.errors = null;
      }
    });
  }
}

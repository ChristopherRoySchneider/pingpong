import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {

  }
  getPets() {

    return this._http.get('/pets');
      }
  getPetById(id = '5c69e4472cc64c61b0628c5b') {
    // our http response is an Observable, store it in a variable
    return this._http.get('/pets/' + id);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log('Got our pet by id!', data));
  }


  addPet(newpet) {
    return this._http.post('/pets', newpet);
  }
  deletePet(id) {
    return this._http.delete(`/pets/${id}`);
  }
  putPet(updatedPet) {
    return this._http.put(`/pets/${updatedPet._id}`,updatedPet);
  }
  addRating(id,newrating) {
    return this._http.post(`/pets/${id}/ratings`, newrating);
  }
  likePet(id) {
    return this._http.get(`/pets/${id}/like`, );
  }
}

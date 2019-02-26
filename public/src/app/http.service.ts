import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {

  }
  getMatchs() {

    return this._http.get('/matchs');
      }
  getMatchById(id = '5c69e4472cc64c61b0628c5b') {
    // our http response is an Observable, store it in a variable
    return this._http.get('/matchs/' + id);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log('Got our match by id!', data));
  }


  addMatch(newmatch) {
    return this._http.post('/matchs', newmatch);
  }
  deleteMatch(id) {
    return this._http.delete(`/matchs/${id}`);
  }
  putMatch(updatedMatch) {
    return this._http.put(`/matchs/${updatedMatch._id}`,updatedMatch);
  }
  addRating(id,newrating) {
    return this._http.post(`/matchs/${id}/ratings`, newrating);
  }
  likeMatch(id) {
    return this._http.get(`/matchs/${id}/like`, );
  }
}

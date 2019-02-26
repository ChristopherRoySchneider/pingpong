import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

    sendMessage(msg: string){
        this.socket.emit("message", msg);
    }
    pushEpicButton(msg: string){
      this.socket.emit("Pushing_epic_button", msg);
  }
     getMessage() {
        console.log("getting here")
        return this.socket
            .fromEvent("message").pipe(
            map( data => data['msg'] ));
    }

    countUpdated() {
      console.log("epic button pushed")
      return this.socket
          .fromEvent("updated_count").pipe(
          map( data => data['numClicks'] ));
  }

}

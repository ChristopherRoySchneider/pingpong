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
  sendGameEvent(msg){
    console.log("emitting :",msg )
    this.socket.emit("new_game_event", msg);
}

sendMatchUpdate(match){
  console.log("emitting :",match )
  this.socket.emit("game_change", match);
}
     getMessage() {
        console.log("getting here")
        return this.socket
            .fromEvent("message").pipe(
            map( data => data['msg'] ));
    }
    subscribeGameEvent() {
      console.log("subscribeGameEvent here")
      return this.socket
          .fromEvent("new_game_event").pipe(
          map( data => data ));
  }

    countUpdated() {
      console.log("epic button pushed")
      return this.socket
          .fromEvent("updated_count").pipe(
          map( data => data['numClicks'] ));
  }
  matchChanged() {
    console.log("subscribed to match changed")
    return this.socket
        .fromEvent("game_change").pipe(
        map( data => data  ));
}

}

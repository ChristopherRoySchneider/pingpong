import { SocketService } from "./socket.service";

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpService } from "./http.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  numClicks=0;
  title = "app";

  messages = [];
  connection;
  connection2;
  constructor(
    private _httpService: HttpService,
    private _SocketService: SocketService
  ) {}
  ngOnInit() {
    console.log("ngOnInit");

    // this.connection = this._SocketService.matchChanged().subscribe(message => {
    //   console.log("match changed: Message:", message);

    // });
    this.connection2 = this._SocketService.countUpdated().subscribe(message => {
      console.log("recieved countUpdated message in this.connection.  Message:", message);
      this.numClicks =message ;
    });
    this._SocketService.sendMessage("test message from ngoninit");
    // this.getPetByIdFromService();

  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }


  onButtonClickTestSocket(): void {
    this._SocketService.pushEpicButton("test message from epic button");

  }

}

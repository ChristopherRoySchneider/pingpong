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

  constructor(
    private _httpService: HttpService,
    private _SocketService: SocketService
  ) {}
  ngOnInit() {



  }

  ngOnDestroy() {

  }




}

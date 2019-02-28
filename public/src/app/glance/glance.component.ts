import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-glance',
  templateUrl: './glance.component.html',
  styleUrls: ['./glance.component.css']
})
export class GlanceComponent implements OnInit {

  constructor() { }

  @Input() gameStateData: any;
  
  ngOnInit() {
  }

  setGame(){

  }

}

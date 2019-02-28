import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-box-score',
  templateUrl: './box-score.component.html',
  styleUrls: ['./box-score.component.css']
})
export class BoxScoreComponent implements OnInit {

  constructor() { }

  @Input() gameStateData: any;

  ngOnInit() {
  }

}

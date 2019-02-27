import { Component, OnInit } from '@angular/core';
import * as terms from './terminology.json';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor() { }
  termsArr =[]
  terms: any = terms['terms']

  ngOnInit() {
    for(var key in this.terms){
      let obj = {
        term: key,
        definition: this.terms[key].definition
      }
      this.termsArr.push(obj)
    }
  }

}




import { Component, OnInit } from '@angular/core';
import * as rules from './rules.json';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  constructor() { }
  rulesArr = []
  rules: any = rules['sections']

    ngOnInit() {
      for(var key in this.rules){
        let obj = {
          title: this.rules[key].title,
          regulations: [],
          subtitle: [],
          details: []
        }
        for(var key1 in this.rules[key].regulations){
          obj.regulations.push(this.rules[key].regulations[key1])
        }
        // console.log(obj.regulations)
        for(var key2 in obj.regulations){
          obj.subtitle.push(obj.regulations[key2])
        }
        // console.log(obj.subtitle)
        for(var key3 in obj.subtitle){
          for(var key4 in obj.subtitle[key3]){
            obj.details.push(obj.subtitle[key3][key4])
        }
      }
        console.log(obj.details)
        this.rulesArr.push(obj);

      }
      // console.log(this.rulesArr)

  }
  isString(val) { 
    return typeof val === 'string' && val.length > 1; 
  }

}
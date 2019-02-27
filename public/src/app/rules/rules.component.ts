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
  regArr = []
  rules: any = rules['sections']

    ngOnInit() {
      for(var key in this.rules){
        let obj = {
          title: this.rules[key].title,
          subtitle: [],
          regulations: []
        }
        for(var key1 in this.rules[key].regulations){
          obj.regulations.push(this.rules[key].regulations[key1])
        }
        for(var key2 in this.rules[key].regulations[key1]){
          obj.subtitle.push(this.rules[key].regulations[key1][key2])
        }
        this.rulesArr.push(obj);

      }
      console.log(this.rulesArr)

  //     for(var key in this.rulesArr){
  //       let new_obj = {
  //         regulations: this.rulesArr[key]['regulations']
  //     }
  //     console.log(key)
  //     this.regArr.push(new_obj)
  //   }
  }
}









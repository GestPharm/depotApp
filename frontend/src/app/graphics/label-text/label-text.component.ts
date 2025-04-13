import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'label-text',
  imports: [CommonModule],
  templateUrl: './label-text.component.html',
  styleUrl: './label-text.component.scss'
})
export class LabelTextComponent implements OnInit{

@Input()
label: any = '';
@Input()
text: any = '';
@Input()
width: number = 10;

constructor(){
  
}
  ngOnInit(): void {
    if(typeof this.text == "boolean"){
      if(this.text== true){
        this.text = 'Oui';
      }else {
        this.text = 'Non';
      }
    }
  }
}

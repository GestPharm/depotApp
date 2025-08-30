import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-psi-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './psi-input.component.html',
  styleUrls: ['./psi-input.component.scss']
})
export class PsiInputComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() value: string | undefined;

  @Output() valueChange = new EventEmitter<string>();

  onValueChange(newValue: string) {
    this.valueChange.emit(newValue);   
  }
}

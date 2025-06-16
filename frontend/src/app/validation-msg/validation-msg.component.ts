import { Component, Input } from '@angular/core';
import { ValidationFields } from '../models/validationFields'; // Adjust path as needed
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-msg',
  templateUrl: './validation-msg.component.html',
  imports: [CommonModule]
})
export class ValidationMsgComponent {
  @Input() validationFields: ValidationFields | null = null;
  @Input() showWarnings: boolean = true;
  @Input() showErrors: boolean = true;
}
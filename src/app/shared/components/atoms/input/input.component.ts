import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponentInterface } from './input.interface';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [CommonModule],
})
export class ButtonComponent {
  input = input<InputComponentInterface>();
}

import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponentInterface } from './input.interface';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class InputComponent {
  input = input<InputComponentInterface>();
}

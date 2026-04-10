import { Component, Input, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputComponentInterface } from './input.interface';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class InputComponent {
  input = input<InputComponentInterface>();

  @Input() formGroup!: FormGroup;

  get control() {
    return this.formGroup.get(this.input()!.formControlName);
  }
}

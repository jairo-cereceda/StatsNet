import { Component, input } from '@angular/core';
import { FormComponentInterface } from './form.interface';
import { InputComponent } from '../../atoms/input/input.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { InputComponentInterface } from '../../atoms/input/input.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  imports: [InputComponent, ReactiveFormsModule],
})
export class Form {
  form = input<FormComponentInterface>();
  formGroup!: FormGroup;

  ngOnInit() {
    const sf = this.form();
    if (sf) {
      this.formGroup = sf.formGroup ?? buildFormGroup(sf.inputs);
    }
  }
}

function buildFormGroup(inputs: InputComponentInterface[]): FormGroup {
  const group: Record<string, FormControl> = {};

  inputs.forEach((input) => {
    group[input.formControlName] = new FormControl('');
  });

  return new FormGroup(group);
}

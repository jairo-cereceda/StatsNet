import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormComponentInterface } from './form.interface';
import { InputComponent } from '../../atoms/input/input.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { InputComponentInterface } from '../../atoms/input/input.interface';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
})
export class Form {
  form = input<FormComponentInterface>();
  formGroup!: FormGroup;
  @Output() submitValid = new EventEmitter<any>();

  ngOnInit() {
    const sf = this.form();
    if (sf) {
      this.formGroup = sf.formGroup ?? buildFormGroup(sf.inputs);
    }
  }

  handleSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.submitValid.emit(this.formGroup.getRawValue());
  }
}

function buildFormGroup(inputs: InputComponentInterface[]): FormGroup {
  const group: Record<string, FormControl> = {};

  inputs.forEach((input) => {
    group[input.formControlName] = new FormControl('');
  });

  return new FormGroup(group);
}

import { FormControl, FormGroup } from '@angular/forms';
import { InputComponentInterface } from '../../atoms/input/input.interface';
import { ButtonComponentInterface } from '../../atoms/button/button.interface';

export interface FormComponentInterface {
  inputs: InputComponentInterface[];
  submitBtn?: ButtonComponentInterface;
  formGroup: FormGroup;
}

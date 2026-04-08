import { FormControl, FormGroup } from '@angular/forms';
import { InputComponentInterface } from '../../atoms/input/input.interface';

export interface FormComponentInterface {
  inputs: InputComponentInterface[];
  formGroup: FormGroup;
}

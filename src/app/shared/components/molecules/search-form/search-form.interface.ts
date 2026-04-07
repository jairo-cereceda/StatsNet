import { FormControl, FormGroup } from '@angular/forms';
import { InputComponentInterface } from '../../atoms/input/input.interface';

export interface SearchFormComponentInterface {
  input: InputComponentInterface;
  formGroup: FormGroup<SearchFormGroup>;
}

export type SearchFormGroup = {
  search: FormControl<string>;
};

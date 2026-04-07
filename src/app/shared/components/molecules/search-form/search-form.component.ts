import { Component, input } from '@angular/core';
import { SearchFormComponentInterface } from './search-form.interface';
import { InputComponent } from '../../atoms/input/input.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  imports: [InputComponent, ReactiveFormsModule],
})
export class SearchForm {
  searchForm = input<SearchFormComponentInterface>();
}

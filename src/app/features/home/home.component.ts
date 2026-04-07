import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchForm } from '../../shared/components/molecules/search-form/search-form.component';
import { SearchFormComponentInterface } from '../../shared/components/molecules/search-form/search-form.interface';
import { StatisticCardListComponent } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.component';
import { StatisticCardListComponentInterface } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [SearchForm, StatisticCardListComponent],
})
export class HomeComponent {
  isLoggedAccount = false;

  searchForm: SearchFormComponentInterface = {
    input: {
      type: 'text',
      placeholder: 'Buscar',
      id: 'search',
      formControlName: 'search',
      label: 'Buscar',
      hideLabel: true,
      icon: '/icons/material-symbols--search.svg',
    },
    formGroup: new FormGroup({
      search: new FormControl<string>('', { nonNullable: true }),
    }),
  };

  statisticCardList: StatisticCardListComponentInterface = {
    title: {
      type: 'md',
      text: 'Actualizaciones',
    },
    statistics: [
      {
        name: {
          type: 'sm',
          text: 'Croquetas',
        },
        userName: '@juan',
        quantity: 10,
        isLoggedAccount: this.isLoggedAccount,
        isNotProfileView: true,
      },
      {
        name: {
          type: 'sm',
          text: 'Croquetas',
        },
        userName: '@jose',
        quantity: 10,
        isLoggedAccount: this.isLoggedAccount,
        isNotProfileView: true,
      },
    ],
  };
}

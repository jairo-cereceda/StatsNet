import { Component, signal } from '@angular/core';
import { ProfileCardComponent } from '../../shared/components/organisms/profile-card/profile-card.component';
import { ProfileCardComponentInterface } from '../../shared/components/organisms/profile-card/profile-card.interface';
import { StatisticCardListComponent } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.component';
import { StatisticCardListComponentInterface } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.interface';
import { TitleButtonComponent } from '../../shared/components/molecules/title-button/title-button.component';
import { TitleButtonComponentInterface } from '../../shared/components/molecules/title-button/title-button.interface';
import { ActionSheetComponent } from '../../shared/components/organisms/action-sheet/action-sheet.component';
import { ActionSheetComponentInterface } from '../../shared/components/organisms/action-sheet/action-sheet.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from '../../shared/components/molecules/form/form.component';
import { FormComponentInterface } from '../../shared/components/molecules/form/form.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    ProfileCardComponent,
    StatisticCardListComponent,
    TitleButtonComponent,
    ActionSheetComponent,
    Form,
  ],
})
export class ProfileComponent {
  isLoggedAccount = true;
  isCreateStatisticFormOpen = signal(false);

  profileCard: ProfileCardComponentInterface = {
    userName: { type: 'lg', text: 'Juan' },
    userImage: '/images/profile.png',
    editProfileButton: {
      type: 'link',
      color: 'brand',
      text: 'Editar perfil',
      url: '/edit-profile',
    },
    isLoggedAccount: this.isLoggedAccount,
  };

  statisticCardList: StatisticCardListComponentInterface = {
    statistics: [
      {
        name: {
          type: 'sm',
          text: 'Croquetas',
        },
        userName: '@juan',
        quantity: 10,
        isLoggedAccount: this.isLoggedAccount,
      },
      {
        name: {
          type: 'sm',
          text: 'Croquetas',
        },
        userName: '@jose',
        quantity: 10,
        isLoggedAccount: this.isLoggedAccount,
      },
    ],
  };

  titleButton: TitleButtonComponentInterface = {
    title: { type: 'md', text: 'Estadísticas' },
    button: {
      type: 'button',
      color: 'brand',
      icon: '/icons/mdi--plus-thick.svg',
      ariaLabel: 'Añadir estadistica',
      event: () => this.openCreateStatisticHandler(),
    },
  };

  statisticForm: FormComponentInterface = {
    inputs: [
      {
        type: 'text',
        placeholder: 'Ej: croquetas',
        id: 'name',
        formControlName: 'name',
        label: 'Nombre',
      },
      {
        type: 'number',
        id: 'quantity',
        formControlName: 'quantity',
        label: 'Cantidad',
      },
    ],

    onSubmit: () => this.createStatistic(),

    formGroup: new FormGroup({
      name: new FormControl<string>('', { nonNullable: true }),
      quantity: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
    }),
  };

  actionSheet: ActionSheetComponentInterface = {
    title: { type: 'md', text: 'Estadísticas' },
  };

  openCreateStatisticHandler() {
    this.isCreateStatisticFormOpen.update((v) => !v);
  }

  createStatistic() {
    this.openCreateStatisticHandler();
    this.statisticForm.formGroup.reset({
      name: '',
      quantity: 0,
    });
  }
}

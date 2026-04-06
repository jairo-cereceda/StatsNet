import { Component, signal } from '@angular/core';
import { ProfileCardComponent } from '../../shared/components/organisms/profile-card/profile-card.component';
import { ProfileCardComponentInterface } from '../../shared/components/organisms/profile-card/profile-card.interface';
import { TitleComponent } from '../../shared/components/atoms/title/title.component';
import { StatisticCardListComponent } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.component';
import { StatisticCardListComponentInterface } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.interface';
import { TitleButtonComponent } from '../../shared/components/molecules/title-button/title-button.component';
import { TitleButtonComponentInterface } from '../../shared/components/molecules/title-button/title-button.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [ProfileCardComponent, TitleComponent, StatisticCardListComponent, TitleButtonComponent],
})
export class ProfileComponent {
  isLoggedAccount = true;

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
        name: { type: 'sm', text: 'Croquetas' },
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
    },
  };
}

import { Component, signal } from '@angular/core';
import { ProfileCardComponent } from '../../shared/components/organisms/profile-card/profile-card.component';
import { ProfileCardComponentInterface } from '../../shared/components/organisms/profile-card/profile-card.interface';
import { TitleComponent } from '../../shared/components/atoms/title/title.component';
import { StatisticCardListComponent } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.component';
import { StatisticCardListComponentInterface } from '../../shared/components/organisms/statistic-card-list/statistic-card-list.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [ProfileCardComponent, TitleComponent, StatisticCardListComponent],
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
}

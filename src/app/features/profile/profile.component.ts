import { Component, signal } from '@angular/core';
import { ProfileCardComponent } from '../../shared/components/organisms/profile-card/profile-card.component';
import { ProfileCardComponentInterface } from '../../shared/components/organisms/profile-card/profile-card.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [ProfileCardComponent],
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
}

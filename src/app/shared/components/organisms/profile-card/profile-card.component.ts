import { Component, input } from '@angular/core';
import { TitleComponent } from '../../atoms/title/title.component';
import { ProfileCardComponentInterface } from './profile-card.interface';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  imports: [TitleComponent, ButtonComponent],
})
export class ProfileCardComponent {
  profileCard = input<ProfileCardComponentInterface>();
}

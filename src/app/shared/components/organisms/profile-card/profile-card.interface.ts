import { ButtonComponentInterface } from '../../atoms/button/button.interface';
import { TitleComponentInterface } from '../../atoms/title/title.interface';

export interface ProfileCardComponentInterface {
  userName: TitleComponentInterface;
  userImage: string;
  editProfileButton?: ButtonComponentInterface;
  isLoggedAccount?: boolean;
}

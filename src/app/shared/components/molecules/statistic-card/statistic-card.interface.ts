import { TitleComponentInterface } from '../../atoms/title/title.interface';

export interface StatisticCardComponentInterface {
  name: TitleComponentInterface;
  userName: string;
  quantity: number;
  isLoggedAccount: boolean;
  isNotProfileView?: boolean;
}

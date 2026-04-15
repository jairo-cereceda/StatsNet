import { TitleComponentInterface } from '../../atoms/title/title.interface';

export interface ToastComponentInterface {
  title?: TitleComponentInterface;
  type: 'success' | 'error' | 'info';
  content: string;
}

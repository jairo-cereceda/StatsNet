import { EventEmitter } from '@angular/core';

export interface ButtonComponentInterface {
  type: 'button' | 'link' | 'submit' | 'icon-button';
  size?: 'full';
  color: 'brand';
  text?: string;
  icon?: string;
  ariaLabel?: string;
  url?: string;
  event?: () => void;
}

export interface ButtonComponentInterface {
  type: 'button' | 'link' | 'icon-button';
  color: 'brand';
  text?: string;
  icon?: string;
  ariaLabel?: string;
  url?: string;
}

export interface InputComponentInterface {
  type: 'text' | 'email' | 'number' | 'password';
  id: string;
  placeholder?: string;
  label: string;
  errorMessage?: string;
  isRequired?: boolean;
  hideLabel?: boolean;
  formControlName: string;
  icon?: string;
  iconAlt?: string;
}

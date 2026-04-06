export interface InputComponentInterface {
  type: 'text' | 'email' | 'number' | 'password';
  id: string;
  placeholder?: string;
  label: string;
  formControlName: string;
}

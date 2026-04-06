export interface InputComponentInterface {
  type: 'text' | 'email' | 'number';
  id: string;
  placeholder?: string;
  label: string;
}

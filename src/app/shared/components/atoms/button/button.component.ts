import { Component, input } from '@angular/core';
import { ButtonComponentInterface } from './button.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [RouterLink],
})
export class ButtonComponent {
  button = input<ButtonComponentInterface>();
}

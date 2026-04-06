import { Component, input } from '@angular/core';
import { ButtonComponentInterface } from './button.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  imports: [RouterLink, CommonModule],
})
export class ButtonComponent {
  button = input<ButtonComponentInterface>();
}

import { Component, input } from '@angular/core';
import { TitleComponent } from '../../atoms/title/title.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { TitleButtonComponentInterface } from './title-button.interface';

@Component({
  selector: 'app-title-button',
  templateUrl: './title-button.component.html',
  imports: [TitleComponent, ButtonComponent],
})
export class TitleButtonComponent {
  titleButton = input<TitleButtonComponentInterface>();
}

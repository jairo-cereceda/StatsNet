import { Component, input, signal } from '@angular/core';
import { TitleComponentInterface } from './title.interface';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
})
export class TitleComponent {
  title = input<TitleComponentInterface>();
}

import { Component, input } from '@angular/core';
import { ToastComponentInterface } from './toast.interface';
import { TitleComponent } from '../../atoms/title/title.component';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [TitleComponent],
})
export class ToastComponent {
  toast = input<ToastComponentInterface>();
  isShown = input<boolean>();
}

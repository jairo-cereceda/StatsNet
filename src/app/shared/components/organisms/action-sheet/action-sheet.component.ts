import {
  Component,
  ElementRef,
  EventEmitter,
  input,
  Output,
  ViewChild,
  HostListener,
  effect,
} from '@angular/core';
import { TitleComponent } from '../../atoms/title/title.component';
import { ActionSheetComponentInterface } from './action-sheet.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.component.html',
  imports: [TitleComponent, CommonModule],
})
export class ActionSheetComponent {
  actionSheet = input<ActionSheetComponentInterface>();
  isOpen = input<boolean>();
  @Output() closed = new EventEmitter<void>();
  @ViewChild('sheetRef') sheet!: ElementRef;
  hasBeenOpened = false;

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        this.hasBeenOpened = true;
        const panel = this.sheet?.nativeElement;
        if (panel) {
          panel.style.transform = 'translateY(0)';
        }
      }
    });
  }

  private startY = 0;
  private currentY = 0;
  private isDragging = false;
  private pointerId: number | null = null;

  @HostListener('pointermove', ['$event'])
  onDragMove(event: PointerEvent) {
    if (!this.isDragging) return;
    if (event.pointerId !== this.pointerId) return;

    this.currentY = Math.max(0, event.clientY - this.startY);

    const panel = this.sheet?.nativeElement;

    const resistance = 0.5;
    panel.style.transform = `translateY(${this.currentY * resistance}px)`;
  }

  @HostListener('pointerup', ['$event'])
  @HostListener('pointercancel', ['$event'])
  onDragEnd(event: PointerEvent) {
    if (!this.isDragging) return;
    if (event.pointerId !== this.pointerId) return;

    const panel = this.sheet?.nativeElement;
    const CLOSE_THRESHOLD = 80;

    if (this.currentY > CLOSE_THRESHOLD) {
      this.close();
    } else {
      panel.style.transform = `translateY(0)`;
    }

    this.isDragging = false;
    this.currentY = 0;
    this.pointerId = null;
  }

  onDragStart(event: PointerEvent) {
    this.isDragging = true;
    this.startY = event.clientY;
    this.pointerId = event.pointerId;

    const panel = this.sheet?.nativeElement;
    panel.setPointerCapture(event.pointerId);
  }

  close() {
    this.closed.emit();
  }
}

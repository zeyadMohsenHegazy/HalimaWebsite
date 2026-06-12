import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Product } from '../../../core/models/product.model';
import { LanguageService } from '../../../core/services/language.service';
import { trapFocus } from '../../../core/utils/focus-trap.utility';
import {
  getProductDescription,
  getProductName,
} from '../../../core/utils/product.utility';
import { LazyImageComponent } from '../lazy-image/lazy-image.component';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [RouterLink, TranslatePipe, LazyImageComponent],
  templateUrl: './product-detail-modal.component.html',
  styleUrl: './product-detail-modal.component.scss',
})
export class ProductDetailModalComponent implements OnChanges, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private releaseFocusTrap?: () => void;
  private previousActiveElement: HTMLElement | null = null;

  readonly language = inject(LanguageService);
  readonly getProductName = getProductName;
  readonly getProductDescription = getProductDescription;

  @ViewChild('dialog') dialogRef?: ElementRef<HTMLElement>;

  @Input() product: Product | null = null;
  @Output() closed = new EventEmitter<void>();

  get isOpen(): boolean {
    return this.product !== null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('product' in changes) {
      if (this.isOpen) {
        this.openModal();
      } else {
        this.closeModalSideEffects();
      }
    }
  }

  ngOnDestroy(): void {
    this.closeModalSideEffects();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.close();
    }
  }

  private openModal(): void {
    this.previousActiveElement = this.document.activeElement as HTMLElement | null;
    this.document.body.style.overflow = 'hidden';

    queueMicrotask(() => {
      const dialog = this.dialogRef?.nativeElement;
      if (dialog) {
        this.releaseFocusTrap = trapFocus(dialog);
      }
    });
  }

  private closeModalSideEffects(): void {
    this.document.body.style.overflow = '';
    this.releaseFocusTrap?.();
    this.releaseFocusTrap = undefined;
    this.previousActiveElement?.focus();
    this.previousActiveElement = null;
  }
}

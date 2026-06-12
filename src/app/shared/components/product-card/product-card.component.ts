import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Product } from '../../../core/models/product.model';
import { LanguageService } from '../../../core/services/language.service';
import {
  getProductDescription,
  getProductName,
} from '../../../core/utils/product.utility';
import { LazyImageComponent } from '../lazy-image/lazy-image.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [TranslatePipe, LazyImageComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  readonly language = inject(LanguageService);
  readonly getProductName = getProductName;
  readonly getProductDescription = getProductDescription;

  @Input({ required: true }) product!: Product;
  @Input() clickable = true;
  @Output() productSelect = new EventEmitter<Product>();

  onSelect(): void {
    if (this.clickable) {
      this.productSelect.emit(this.product);
    }
  }
}

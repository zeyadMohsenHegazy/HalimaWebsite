import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FaqItem } from '../../../core/models/faq.model';

@Component({
  selector: 'app-faq-item',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './faq-item.component.html',
  styleUrl: './faq-item.component.scss',
})
export class FaqItemComponent {
  @Input({ required: true }) item!: FaqItem;
  @Input() expanded = false;
  @Output() toggleItem = new EventEmitter<void>();

  get categoryLabelKey(): string {
    const map: Record<FaqItem['category'], string> = {
      milk: 'FAQ.CAT_MILK',
      juice: 'FAQ.CAT_JUICE',
      quality: 'FAQ.CAT_QUALITY',
      storage: 'FAQ.CAT_STORAGE',
      distribution: 'FAQ.CAT_DISTRIBUTION',
      support: 'FAQ.CAT_SUPPORT',
    };
    return map[this.item.category];
  }

  onToggle(): void {
    this.toggleItem.emit();
  }
}

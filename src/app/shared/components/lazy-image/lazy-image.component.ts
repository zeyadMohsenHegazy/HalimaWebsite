import { Component, Input, signal } from '@angular/core';

export type ImagePriority = 'high' | 'low' | 'auto';

@Component({
  selector: 'app-lazy-image',
  standalone: true,
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.scss',
})
export class LazyImageComponent {
  @Input({ required: true }) src!: string;
  @Input({ required: true }) alt!: string;
  @Input() width = 400;
  @Input() height = 300;
  @Input() priority: ImagePriority = 'low';
  @Input() aspectRatio = '4 / 3';

  readonly loaded = signal(false);
  readonly failed = signal(false);

  onLoad(): void {
    this.loaded.set(true);
  }

  onError(): void {
    this.failed.set(true);
    this.loaded.set(true);
  }

  get loadingAttr(): 'eager' | 'lazy' {
    return this.priority === 'high' ? 'eager' : 'lazy';
  }

  get fetchPriority(): 'high' | 'low' | 'auto' | undefined {
    return this.priority === 'high' ? 'high' : this.priority === 'low' ? 'low' : 'auto';
  }
}

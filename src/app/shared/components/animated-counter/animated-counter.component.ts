import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  template: `<span class="counter" aria-live="polite">{{ formattedValue() }}{{ suffix }}</span>`,
  styles: `
    .counter {
      font-variant-numeric: tabular-nums;
    }
  `,
})
export class AnimatedCounterComponent implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  @Input({ required: true }) target = 0;
  @Input() suffix = '';
  @Input() duration = 2000;

  readonly displayValue = signal(0);

  formattedValue(): string {
    return this.displayValue().toLocaleString();
  }

  private observer?: IntersectionObserver;
  private frameId?: number;
  private hasAnimated = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.displayValue.set(this.target);
      return;
    }

    if (this.prefersReducedMotion()) {
      this.displayValue.set(this.target);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animate();
        }
      },
      { threshold: 0.35 },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private animate(): void {
    const start = performance.now();
    const from = 0;
    const to = this.target;

    const step = (now: number) => {
      const progress = Math.min((now - start) / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayValue.set(Math.floor(from + (to - from) * eased));

      if (progress < 1) {
        this.frameId = requestAnimationFrame(step);
      } else {
        this.displayValue.set(to);
      }
    };

    this.frameId = requestAnimationFrame(step);
  }
}

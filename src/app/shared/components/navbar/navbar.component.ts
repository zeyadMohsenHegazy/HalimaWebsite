import {
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

interface NavLink {
  path: string;
  labelKey: string;
  exact?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe, LanguageSwitcherComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  readonly languageService = inject(LanguageService);

  readonly menuOpen = signal(false);
  readonly isScrolled = signal(false);

  readonly navLinks: NavLink[] = [
    { path: '/', labelKey: 'NAV.HOME', exact: true },
    { path: '/about', labelKey: 'NAV.ABOUT' },
    { path: '/products', labelKey: 'NAV.PRODUCTS' },
    { path: '/faq', labelKey: 'NAV.FAQ' },
    { path: '/contact', labelKey: 'NAV.CONTACT' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 12);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 992) {
      this.closeMenu();
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    this.syncBodyScroll();
  }

  closeMenu(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
      this.syncBodyScroll();
    }
  }

  private syncBodyScroll(): void {
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }
}

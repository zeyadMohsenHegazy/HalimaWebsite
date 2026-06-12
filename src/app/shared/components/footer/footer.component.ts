import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

interface SocialLink {
  name: string;
  url: string;
  icon: 'facebook' | 'instagram' | 'youtube' | 'linkedin';
}

interface FooterLink {
  path: string;
  labelKey: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly languageService = inject(LanguageService);

  readonly currentYear = new Date().getFullYear();

  readonly quickLinks: FooterLink[] = [
    { path: '/', labelKey: 'NAV.HOME' },
    { path: '/about', labelKey: 'NAV.ABOUT' },
    { path: '/products', labelKey: 'NAV.PRODUCTS' },
    { path: '/faq', labelKey: 'NAV.FAQ' },
    { path: '/contact', labelKey: 'NAV.CONTACT' },
  ];

  readonly socialLinks: SocialLink[] = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  ];

}

import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CONTACT_MAP_LOCATION } from '../../core/config/contact.config';
import { ContactSubmitStatus } from '../../core/models/contact-form.model';
import { ContactService } from '../../core/services/contact/contact.service';
import { PageSeoHelper } from '../../core/services/page-seo.helper';
import { phoneValidator } from '../../core/validators/phone.validator';
import {
  buildBreadcrumbSchema,
  buildContactPageSchema,
  buildWebPageSchema,
  collectJsonLdNodes,
} from '../../core/utils/json-ld.utility';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, PageHeroComponent, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly pageSeo = inject(PageSeoHelper);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly contactService = inject(ContactService);

  readonly mapLocation = CONTACT_MAP_LOCATION;
  readonly submitStatus = signal<ContactSubmitStatus>('idle');

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, phoneValidator()]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {
    this.pageSeo.bind(() => {
      const title = this.translate.instant('CONTACT.META_TITLE');
      const description = this.translate.instant('CONTACT.META_DESCRIPTION');

      return {
        path: '/contact',
        title,
        description,
        keywords: this.translate.instant('CONTACT.META_KEYWORDS'),
        type: 'website',
        jsonLd: collectJsonLdNodes(
          buildContactPageSchema(),
          buildWebPageSchema('/contact', title, description),
          buildBreadcrumbSchema([
            { name: this.translate.instant('NAV.HOME'), path: '/' },
            { name: this.translate.instant('NAV.CONTACT'), path: '/contact' },
          ]),
        ),
      };
    }, this.destroyRef);
  }

  isLoading(): boolean {
    return this.submitStatus() === 'loading';
  }

  isSuccess(): boolean {
    return this.submitStatus() === 'success';
  }

  isError(): boolean {
    return this.submitStatus() === 'error';
  }

  getFieldErrorKey(fieldName: keyof typeof this.form.controls): string | null {
    const control = this.form.controls[fieldName];

    if (!control.touched || !control.errors) {
      return null;
    }

    if (control.errors['required']) {
      return 'CONTACT.ERRORS.REQUIRED';
    }

    if (control.errors['email']) {
      return 'CONTACT.ERRORS.EMAIL';
    }

    if (control.errors['phone']) {
      return 'CONTACT.ERRORS.PHONE';
    }

    if (control.errors['minlength']) {
      return fieldName === 'message'
        ? 'CONTACT.ERRORS.MESSAGE_MIN'
        : 'CONTACT.ERRORS.MIN_LENGTH';
    }

    return 'CONTACT.ERRORS.INVALID';
  }

  hasFieldError(fieldName: keyof typeof this.form.controls): boolean {
    return this.getFieldErrorKey(fieldName) !== null;
  }

  onSubmit(): void {
    if (this.isLoading()) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitStatus.set('loading');

    const payload = this.form.getRawValue();

    this.contactService
      .submitForm(payload)
      .subscribe({
        next: () => {
          this.submitStatus.set('success');
          this.form.reset();
        },
        error: () => {
          this.submitStatus.set('error');
        },
      });
  }
}

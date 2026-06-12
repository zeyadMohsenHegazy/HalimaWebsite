import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactFormPayload } from '../../models/contact-form.model';

/** Abstraction for contact form delivery — swap EmailJS for an HTTP API later. */
export interface ContactEmailSender {
  send(payload: ContactFormPayload): Observable<void>;
}

export const CONTACT_EMAIL_SENDER = new InjectionToken<ContactEmailSender>(
  'CONTACT_EMAIL_SENDER',
);

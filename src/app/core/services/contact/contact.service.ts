import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactFormPayload } from '../../models/contact-form.model';
import { CONTACT_EMAIL_SENDER } from './contact-email-sender';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly emailSender = inject(CONTACT_EMAIL_SENDER);

  submitForm(payload: ContactFormPayload): Observable<void> {
    return this.emailSender.send(payload);
  }
}

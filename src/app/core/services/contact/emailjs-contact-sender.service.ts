import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONTACT_RECIPIENT_EMAIL } from '../../config/contact.config';
import { ContactFormPayload } from '../../models/contact-form.model';
import { environment } from '../../../../environments/environment';
import { ContactEmailSender } from './contact-email-sender';

@Injectable()
export class EmailJsContactSender implements ContactEmailSender {
  send(payload: ContactFormPayload): Observable<void> {
    const { serviceId, templateId, publicKey } = environment.emailjs;

    return from(
      emailjs.send(
        serviceId,
        templateId,
        {
          to_email: CONTACT_RECIPIENT_EMAIL,
          from_name: payload.fullName,
          reply_to: payload.email,
          user_email: payload.email,
          phone: payload.phone,
          subject: payload.subject,
          message: payload.message,
        },
        { publicKey },
      ),
    ).pipe(map(() => undefined));
  }
}

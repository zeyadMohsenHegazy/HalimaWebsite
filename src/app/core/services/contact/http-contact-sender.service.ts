import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContactFormPayload } from '../../models/contact-form.model';
import { environment } from '../../../../environments/environment';
import { ContactEmailSender } from './contact-email-sender';

/**
 * Backend-ready sender — enable by swapping the provider in app.config.ts.
 * Expects POST {apiUrl}/contact accepting ContactFormPayload.
 */
@Injectable()
export class HttpContactSender implements ContactEmailSender {
  private readonly http = inject(HttpClient);

  send(payload: ContactFormPayload): Observable<void> {
    const url = `${environment.apiUrl}/contact`;

    return this.http.post<void>(url, payload).pipe(map(() => undefined));
  }
}

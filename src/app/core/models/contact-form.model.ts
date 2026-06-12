export interface ContactFormPayload {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type ContactSubmitStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Copy values into environment.ts / environment.prod.ts before deployment.
 * Do NOT commit real API keys to version control.
 */
export const environment = {
  production: true,
  siteUrl: 'https://www.halima.com',
  apiUrl: '/api',
  emailjs: {
    publicKey: 'your_emailjs_public_key',
    serviceId: 'your_emailjs_service_id',
    templateId: 'your_emailjs_template_id',
  },
};

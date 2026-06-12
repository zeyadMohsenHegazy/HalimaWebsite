import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const PHONE_PATTERN = /^[\d\s+\-().]+$/;
const MIN_DIGITS = 8;
const MAX_DIGITS = 15;

/** Validates phone numbers with 8–15 digits; allows +, spaces, dashes, and parentheses. */
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value as string | null | undefined)?.trim();

    if (!value) {
      return null;
    }

    if (!PHONE_PATTERN.test(value)) {
      return { phone: true };
    }

    const digits = value.replace(/\D/g, '');

    if (digits.length < MIN_DIGITS || digits.length > MAX_DIGITS) {
      return { phone: true };
    }

    return null;
  };
}

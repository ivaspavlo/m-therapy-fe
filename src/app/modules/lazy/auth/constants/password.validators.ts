import { AbstractControl, ValidatorFn } from '@angular/forms';


export const PasswordErrorKeys = ['noLowerCase', 'noUpperCase', 'noNumeric', 'minEightChar', 'notEqual'];

export class PasswordValidators {
  
  static hasOneLowerCase(control: AbstractControl): any | null {
    return /(?=.*[a-z])/g.test(control.value) ? null : { noLowerCase: true };
  }
  
  static hasOneUpperCase(control: AbstractControl): any | null {
    return /(?=.*[A-Z])/g.test(control.value) ? null : { noUpperCase: true };
  }
  
  static hasOneNumeric(control: AbstractControl): any | null {
    return /(?=.*[0-9])/g.test(control.value) ? null : { noNumeric: true };
  }
  
  static minEightChar(control: AbstractControl): any | null {
    return /(?=.{8,})/g.test(control.value) ? null : { minEightChar: true };
  }
  
  static passwordsEqual(passwordControlName = 'password'): ValidatorFn {
    return (control: AbstractControl) => {
      const formGroup = control.parent;
      const passwordControl = control?.parent?.get(passwordControlName);
      if (!formGroup || !passwordControl) {
        return null;
      }
      return passwordControl.value !== control.value && (control.dirty || control.touched) ? { notEqual: true } : null;
    }
  }
  
  static default(control: AbstractControl): any | null {
    const res =
      PasswordValidators.hasOneNumeric(control) ||
      PasswordValidators.hasOneLowerCase(control) ||
      PasswordValidators.hasOneUpperCase(control) ||
      PasswordValidators.minEightChar(control);
    return res;
  }
  
}

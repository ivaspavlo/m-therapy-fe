import { AbstractControl } from '@angular/forms';


export class DateValidators {
  
  static birthDate(control: AbstractControl): any | null {
    if (!control.value) {
      return { birthDate: true };
    }
    const maxValidYear = new Date().getFullYear() - 12;
    const minValidYear = new Date().getFullYear() - 100;

    const [year] = control.value.split('-');

    if (+year < minValidYear || +year > maxValidYear) {
      return { birthDate: true };
    }
  }
  
}

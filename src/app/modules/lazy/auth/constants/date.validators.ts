import { AbstractControl } from '@angular/forms';


export class DateValidators {
  
  static birthDate(control: AbstractControl): any | null {
    const maxValidYear = new Date().getFullYear() - 12;
    const minValidYear = new Date().getFullYear() - 100;
    const isDateType = control.value instanceof Date;
    if (!isDateType || control.value.getFullYear() < minValidYear || control.value.getFullYear() > maxValidYear) {
      return { birthDate: true };
    }
  }
  
}

import { Pipe, PipeTransform } from '@angular/core';
import { FormErrors } from '@app/core/constants';


@Pipe({
  name: 'firstError'
})
export class FirstErrorPipe implements PipeTransform {
  transform(errors: {[key:string]: boolean} | null): string {
    if (errors && Object.keys(errors).length) {
      const [firstKey] = Object.keys(errors);
      return FormErrors[firstKey] ?? firstKey;
    }
    return '';
  }
}

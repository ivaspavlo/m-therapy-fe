import { PipeTransform, Pipe } from '@angular/core';
import { FormErrors } from '@core/constants';


@Pipe({
  name: 'firstError'
})
export class FirstErrorPipe implements PipeTransform {
  transform(errors: {[key:string]: boolean} | null): string {
    const errorsMap = FormErrors as {[key:string]: string};
    if (errors && Object.keys(errors).length) {
      const [firstKey] = Object.keys(errors);
      return errorsMap && errorsMap[firstKey] ?
        errorsMap[firstKey] :
        firstKey;
    }
    return '';
  }
}

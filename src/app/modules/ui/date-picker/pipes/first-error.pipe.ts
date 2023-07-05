import { PipeTransform, Pipe } from '@angular/core';
import { ValidationErrors } from '@angular/forms';


@Pipe({
  name: 'firstError'
})
export class FirstErrorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null, errorsMap: {[key:string]: string}): string {
    if (errors && Object.keys(errors).length) {
      const [firstKey] = Object.keys(errors);
      return errorsMap && errorsMap[firstKey] ?
        errorsMap[firstKey] :
        firstKey;
    }
    return '';
  }
}

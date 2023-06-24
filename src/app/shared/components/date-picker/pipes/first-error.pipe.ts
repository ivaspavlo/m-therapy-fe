import {PipeTransform, Pipe} from '@angular/core';


@Pipe({
  name: 'firstError'
})
export class FirstErrorPipe implements PipeTransform {
  transform(errors: {[key:string]: boolean}, errorsMap: {[key:string]: string}): string {
    if (errors && Object.keys(errors).length) {
      const [firstKey] = Object.keys(errors);
      return errorsMap && errorsMap[firstKey] ?
        errorsMap[firstKey] :
        firstKey;
    }
  }
}

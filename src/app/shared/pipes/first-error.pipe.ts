import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'firstError'
})
export class FirstErrorPipe implements PipeTransform {
  transform(errors: {[key:string]: boolean} | null, errorsMap: {[key:string]: string}): string {
    if (errors && Object.keys(errors).length) {
      const [firstKey] = Object.keys(errors);
      return errorsMap && errorsMap[firstKey] ?
        errorsMap[firstKey] :
        firstKey;
    }
    return '';
  }
}

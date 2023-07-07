import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';


@Pipe({
  name: 'controlRequired'
})
export class ControlRequiredPipe implements PipeTransform {
  transform(control: AbstractControl): boolean {
    return control.hasValidator(Validators.required);
  }
}

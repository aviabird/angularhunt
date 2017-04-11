import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { UrlValidator } from './url';

const URL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => UrlValidatorDirective),
  multi: true
};

@Directive({
  selector: '[url][formControlName],[url][formControl],[url][ngModel]',
  providers: [URL_VALIDATOR]
})
export class UrlValidatorDirective implements Validator {
  validate(c: AbstractControl): {[key: string]: any} {
    return UrlValidator(c);
  }
}

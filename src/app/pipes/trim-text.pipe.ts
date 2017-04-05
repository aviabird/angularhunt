import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimText'
})
export class TrimTextPipe implements PipeTransform {

  transform(value: string, args?: any): any {
     if (!value) {
      return '';
    }
    if (value.length > 140) {
      return `${value.substring(0, 140)}...`;
    } else {
      return value;
    }
  }
}

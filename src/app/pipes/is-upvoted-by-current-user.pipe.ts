import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isUpvotedByCurrentUser'
})
export class IsUpvotedByCurrentUserPipe implements PipeTransform {

  transform(value: String, args: String[]): any {
    return args.indexOf(value) !== -1 ? true : false;
  }
}

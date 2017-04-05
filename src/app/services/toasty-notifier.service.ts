import { Injectable } from '@angular/core';

declare var noty: any;

export interface Toasty {
  result: string;
  msg: string;
}

@Injectable()
export class ToastyNotifierService {

  pop(toasty: Toasty) {
    let n = noty({ timeout: 4000 });
    if (toasty.result === 'success') {
      n.setType('success');
    } else {
      n.setType('error');
    }
    n.setText(toasty.msg);
  }

}

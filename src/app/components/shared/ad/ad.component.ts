import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ad',
  template: `
    <div>
      <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-4777776799828571"
        data-ad-slot="8056586640"
        data-ad-format="auto">
      </ins>
    </div> 
  `,
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      try {
        (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
      }catch (e) {
        console.error('error');
      }
    }, 2000);
  }

}

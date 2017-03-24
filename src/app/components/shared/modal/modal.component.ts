import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.lgModal.show();
  }
}

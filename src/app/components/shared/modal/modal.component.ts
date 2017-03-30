import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('lgModal') public lgModal: ModalDirective;

  constructor(private location: Location) { }

  ngAfterViewInit() {
    this.lgModal.show();
  }
  closeModal() {
    this.lgModal.hide();
    this.location.back();
  }
}

import { User } from './../../../../models/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})
export class ProfileDropdownComponent implements OnInit {
  @Input() user: User = null;
  @Output() logoutClicked = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  logout() {
    this.logoutClicked.emit();
  }
}

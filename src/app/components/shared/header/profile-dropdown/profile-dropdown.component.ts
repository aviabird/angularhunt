import { User } from './../../../../models/user';
import { Component,Input, Output, EventEmitter } from '@angular/core';
// import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-profile-dropdown',
  templateUrl: './profile-dropdown.component.html',
  styleUrls: ['./profile-dropdown.component.css']
})
export class ProfileDropdownComponent {
  @Input() user: User = null;
  @Output() logoutClicked = new EventEmitter();
  validEmailPattern: RegExp = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@aviabird.com/;


  isAdmin() {
    return this.validEmailPattern.test(this.user.email);
  }

  logout() {
    this.logoutClicked.emit();
  }
}

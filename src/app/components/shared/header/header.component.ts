import { ProjectService } from './../../../services/project.service';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { User } from '../../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Output() logoutClicked = new EventEmitter();
  @Input() user: User = null;
  constructor(private projectService: ProjectService) { }

  logout() {
    this.logoutClicked.emit();
  }

  uploaData() {
    this.projectService.sendData();
  }

}

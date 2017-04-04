import { Project } from './../../models/project';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  @Input() project: Project = null;
  @Input() isUpvotedByCurrUser: boolean;
  @Output() toggleUpvoteClick = new EventEmitter();
  action: string;

  onToggleUpvote() {
    this.action = this.isUpvotedByCurrUser ? 'removeVote' : 'upvote';
    this.toggleUpvoteClick.emit({ project: this.project, action: this.action });
  }
}

import { Project } from './../../models/project';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project = null;
  @Input() isUpvotedByCurrUser: boolean;
  @Output() toggleUpvoteClick = new EventEmitter();
  action: string;
  socialButtonHtml: string;
  tags: String[] = ['angularHunt', 'projects'];
  constructor() { }

  ngOnInit() {
  }

  onToggleUpvote(){
    this.action = this.isUpvotedByCurrUser ? 'removeVote' : 'upvote';
    this.toggleUpvoteClick.emit({ project: this.project, action: this.action });
  }
}

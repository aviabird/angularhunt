import { Project } from './../../models/project';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project: Project = null;
  @Output() toggleUpvoteClick = new EventEmitter();
  socialButtonHtml: string;
  tags: String[] = ['angularHunt', 'projects'];
  constructor() { }

  ngOnInit() {
  }

  onToggleUpvote(){
    this.toggleUpvoteClick.emit(this.project.id);
  }
}

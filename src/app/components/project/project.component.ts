import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() project;
  @Output() toggleUpvoteClick = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onToggleUpvote(){
    this.toggleUpvoteClick.emit(this.project.id);
  }
}

import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements OnInit {
  @Input() project = null;
  @Input() isUpvotedByCurrUser: boolean;
  @Output() toggleUpvoteClick = new EventEmitter();
  action: string;

  get id() {
    return this.project.id;
  }

  constructor() { }


  ngOnInit() {
  }

  onToggleUpvote() {
    this.action = this.isUpvotedByCurrUser ? 'removote' : 'upvote';
    this.toggleUpvoteClick
      .emit({ project: this.project, action: this.action });
  }
}

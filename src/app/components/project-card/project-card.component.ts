import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements OnInit {
  @Input() project;
  @Output() toggleUpvoteClick = new EventEmitter();

  get id(){
    return this.project.id;
  }

  constructor() { }


  ngOnInit() {
  }

  onToggleUpvote(id){
    this.toggleUpvoteClick.emit(this.project.id);
  }
}

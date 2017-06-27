import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './../models/project';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(projects: Project[], args: any): any {
    return projects.filter(project => project.name.toLowerCase()
      .indexOf(args.toLowerCase()) !== -1);
  }
}

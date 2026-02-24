import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.component.html',
  styleUrl: './task-stats.component.css',
})
export class TaskStatsComponent {

  @Input() tasks: Task[] = [];

  get total(): number {
    return this.tasks.length;
  }

  get completed(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  get pending(): number {
    return this.total - this.completed;
  }

  get completionRate(): number {
    if (this.total === 0) return 0;
    return Math.round((this.completed / this.total)* 100);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskStatsComponent } from '../task-stats/task-stats.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskStatsComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})

export class TaskListComponent {

  tasks$;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.state$;
  }

  newTask = '';

  addTask() {
    if (!this.newTask.trim()) return;

    this.taskService.addTask(this.newTask.trim());
    this.newTask = '';
    }
  
  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  logTasks() {
    this.taskService.state$.subscribe(state => {
      console.log(state.tasks);
    }).unsubscribe();
  }
}

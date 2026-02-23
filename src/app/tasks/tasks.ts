import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})

export class Tasks {

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

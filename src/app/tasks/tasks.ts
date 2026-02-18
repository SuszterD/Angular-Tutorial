import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})

export class Tasks {
  tasks: Task[] = [
    {id: 1, title: 'Angular tanulás', completed: false},
    {id: 2, title: 'Backend összekötés', completed: false},
    {id: 3, title: 'Szakmai gyakorlat', completed: false}
  ];

  nextId = 4;
  newTask = '';

  addTask() {
    if (!this.newTask.trim()) return;

    const task: Task = {
      id: this.nextId++,
      title: this.newTask.trim(),
      completed: false
    };
    this.tasks.push(task);
    this.newTask = '';
    }
  
  toggleTask(id: number) {
    this.tasks = this.tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        :task
    );
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  logTasks() {
    console.log(this.tasks);
  }
}

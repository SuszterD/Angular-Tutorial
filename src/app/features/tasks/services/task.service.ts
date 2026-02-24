import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Task, TaskStats } from "../models/task.model";
import { map } from "rxjs/operators";

interface TaskState {
    tasks: Task[];
    nextId: number;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    
    private state: TaskState = {
        tasks: [
            {id: 1, title: 'Angular tanulás', completed: false},
            {id: 2, title: 'Backend összekötés', completed: false},
            {id: 3, title: 'Szakmai gyakorlat', completed: false}
        ],
        nextId: 4
    };

    private stateSubject = new BehaviorSubject<TaskState>(this.state);
    public state$ = this.stateSubject.asObservable();

    addTask(title: string){
        const newTask = {
            id: this.state.nextId,
            title,
            completed: false
        };

        const newState = {
            ...this.state,
            tasks: [...this.state.tasks, newTask],
            nextId: this.state.nextId + 1
        };

        this.state = newState;
        this.stateSubject.next(newState);
    }

    toggleTask(id: number) {
        const newState = {
            ...this.state,
            tasks: this.state.tasks.map(task =>
                task.id === id
                ? { ...task, completed: !task.completed }
                : task
            )
        };

        this.state = newState;
        this.stateSubject.next(newState);
    }

    deleteTask(id: number) {
        const newState = {
            ...this.state,
            tasks: this.state.tasks.filter(task => task.id !== id)
        };

        this.state = newState;
        this.stateSubject.next(newState);
    }

    stats$ = this.state$.pipe(
        map(state => {
            const tasks = state.tasks;

            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            const pending = total - completed;
            const completionRate = total === 0 ? 0 : Math.round((completed / total)* 100);

            const stats: TaskStats = {
                total,
                completed,
                pending,
                completionRate
            };

            return stats;
            })
        );
}
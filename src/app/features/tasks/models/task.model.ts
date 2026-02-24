export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export interface TaskStats {
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
}
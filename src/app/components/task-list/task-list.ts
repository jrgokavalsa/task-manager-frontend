import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.html',
  imports: [CommonModule, RouterLink],
  styleUrl: './task-list.scss',
})
export class TaskList implements OnInit {
    private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading.set(true);

    this.taskService.getTasks().subscribe({
      next: (response) => {
        console.log('Tasks:', response);
        this.tasks.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.errorMessage.set('Unable to load tasks.');
        this.loading.set(false);
      }
    });
  }

  toggleCompleted(id: number): void {
    this.taskService.markTaskAsCompleted(id).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.map(task =>
            task.id === id
              ? { ...task, completed: true }
              : task
          )
        );
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.filter(task => task.id !== id)
        );
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      }
    });
  }
}

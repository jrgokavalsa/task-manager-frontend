import { Component, inject, OnInit, signal } from "@angular/core";
import { Task } from "../../models/task.model";
import { TaskService } from "../../services/task.service";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
    selector: 'app-task-detail',
    templateUrl: './task-detail.html',
    styleUrl: './task-detail.scss',
    imports: [RouterLink]
})

export class TaskDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  task = signal<Task | null>(null);
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.errorMessage.set('Invalid task ID.');
      this.loading.set(false);
      return;
    }

    this.taskService.getTaskById(id).subscribe({
      next: (response) => {
        this.task.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching task:', error);
        this.errorMessage.set('Unable to load task details.');
        this.loading.set(false);
      }
    });
  }

}
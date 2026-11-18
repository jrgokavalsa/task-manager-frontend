import { Component, inject } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Task } from "../../models/task.model";

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.html',
    styleUrl: './task-form.scss',
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
})
export class TaskForm {

   private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  taskForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

 onSubmit(): void {
  if (this.taskForm.invalid) {
    this.taskForm.markAllAsTouched();
    return;
  }

  const taskRequest: Task = {
    title: this.taskForm.controls.title.value,
    description: this.taskForm.controls.description.value,
    completed: false,
    id: 0 // Assuming the backend will assign the ID
  };

  this.taskService.createTask(taskRequest).subscribe({
    next: () => this.router.navigate(['/tasks']),
    error: (error) => console.error('Error creating task:', error)
  });
}

  cancel(): void {
    this.router.navigate(['/tasks']);
  }
}
import { HttpClient } from "@angular/common/http";
import { Injectable,inject } from "@angular/core";
import { Task } from "../models/task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    #httpClient= inject(HttpClient);

    getTasks() {
        return this.#httpClient.get<Task[]>('http://localhost:8080/api/tasks');
    }

    createTask(task: Task) {
        return this.#httpClient.post('http://localhost:8080/api/tasks', task);
    }

    deleteTask(id: number) {
        return this.#httpClient.delete(`http://localhost:8080/api/tasks/${id}`);
    }

   markTaskAsCompleted(id: number) {
  return this.#httpClient.put<Task>(
    `http://localhost:8080/api/tasks/${id}`,
    {}
  );
}
     getTaskById(id: number) {
        return this.#httpClient.get<Task>(`http://localhost:8080/api/tasks/${id}`);
    }
}   



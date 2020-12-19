import { Component, OnInit } from '@angular/core';

import { Task, TaskWriteDto } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  newTask: TaskWriteDto

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
    this.resetNewTask()
  }

  getTasks(): void {
    this.taskService.getTasks()
      .subscribe(tasks => this.tasks = tasks)
  }

  createNewTask(): void {
    this.taskService.addTask(this.newTask).subscribe(task => {
      if (task) {
        this.tasks.push(task)
        this.resetNewTask()
      }
    });
  }

  resetNewTask(): void {
    this.newTask = { description: "" }
  }
}

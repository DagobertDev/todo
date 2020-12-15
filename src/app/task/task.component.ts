import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
  }

  save(): void {
    this.taskService.updateTask(this.task).subscribe();
  }
}

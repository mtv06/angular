import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { ClaimService } from 'src/app/shared/services/claim.service';
import { BrigadeService } from 'src/app/shared/services/brigade.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

export interface Task {
  Id: number;
  Claim: number;
  BrigadeId: number;
  TaskStaging: string;
  BrigadeConfirmation: boolean;
  BrigadeNote: string;
  BrigadeMark: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['ClaimId', 'BrigadeId', 'TaskStaging', 'BrigadeConfirmation', 'BrigadeNote', 'BrigadeMark'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: TaskService,
    private claimService: ClaimService,
    private brigadeService: BrigadeService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.service.getTask().subscribe((res: Task[]) => {
      console.log('Task - ', res)
      this.dataSource = new MatTableDataSource<Task>(res)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

}

import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TaskService } from 'src/app/shared/services/task.service';
import { ClaimService } from 'src/app/shared/services/claim.service';
import { BrigadeService } from 'src/app/shared/services/brigade.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { TaskComponent } from '../task/task.component';
import { Task } from 'src/app/shared/interfaces/task.interface';
import { Claim } from 'src/app/shared/interfaces/claim.interface';
import { Brigade } from 'src/app/shared/interfaces/brigade.interface';
import { ReportComponent } from '../../report/report.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  displayedColumns: string[] = ['TaskNumber', 'TaskDate', 'Claim', 'Brigade', 'TaskStaging', 'BrigadeConfirmation', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: TaskService,
              private claimService: ClaimService,
              private brigadeService: BrigadeService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogService: DialogService,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.refresh();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onReport() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    this.dialog.open(ReportComponent, dialogConfig);
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(TaskComponent, dialogConfig)
    .afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    this.service.claimNumber = String(row.ClaimId);
    this.service.brigadeName = String(row.BrigadeId);
    this.service.brigadeConfirmation = row.BrigadeConfirmation;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(TaskComponent, dialogConfig)
      .afterClosed().subscribe(() => {
        this.refresh();
      });
  }

  onDelete(id: any) {
    this.dialogService.openConfirmDialog()
      .afterClosed().subscribe(res => {
        if (res) {
          this.service.deleteTask(id).subscribe(() => {
              this.refresh();
              this.notificationService.warn('Запись успешно удалена!');
            }
          );
        }
      });
  }

  refresh() {
    this.service.getAllTask().subscribe((res: Task[]) => {
      res.forEach((_, i) => {
        this.claimService.getClaim(res[i].ClaimId).subscribe((claim: Claim[]) => {
          res[i].Claim = claim[0].Customer;
        });
        this.brigadeService.getBrigade(res[i].BrigadeId).subscribe((brigade: Brigade[]) => {
          res[i].Brigade = brigade[0].BrigadeName;
        });
      });
      this.dataSource = new MatTableDataSource<Task>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.changeDetectorRefs.detectChanges();
    });
  }

}

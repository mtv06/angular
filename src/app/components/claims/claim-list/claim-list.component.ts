import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ClaimService } from 'src/app/shared/services/claim.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ClaimComponent } from 'src/app/components/claims/claim/claim.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Claim } from 'src/app/shared/interfaces/claim.interface';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent implements OnInit {
  displayedColumns: string[] = ['ClaimNumber', 'ClaimDate', 'Customer', 'CustomerRequisites', 'ListWorks', 'actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: ClaimService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.refresh();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(ClaimComponent, dialogConfig)
      .afterClosed().subscribe(() => {
        this.refresh();
      });
  }

  onEdit(row: any) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30%';
    this.dialog.open(ClaimComponent, dialogConfig)
    .afterClosed().subscribe(() => {
      this.refresh();
    });
  }

  onDelete(id: any) {
    this.dialogService.openConfirmDialog()
      .afterClosed().subscribe((res) => {
        if (res) {
          this.service.deleteClaim(id).subscribe(() => {
              this.refresh();
              this.notificationService.warn('Запись успешно удалена!');
            }
          );
        }
      });
  }

  refresh() {
    this.service.getAllClaim().subscribe((res: Claim[]) => {
      this.dataSource = new MatTableDataSource<Claim>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}

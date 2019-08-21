import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { ClaimService } from 'src/app/shared/services/claim.service';
import { BrigadeService } from 'src/app/shared/services/brigade.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ClaimComponent } from 'src/app/components/claims/claim/claim.component';
import { DialogService } from 'src/app/shared/services/dialog.service';

export interface PeriodicElement {
  $key: number;
  ClaimNumber: number;
  ClaimDate: string;
  Customer: string;
  CustomerRequisites: number;
  ListWorks: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { $key: 1, ClaimNumber: 1, ClaimDate: '2019-02-02', Customer: 'Hydrogen', CustomerRequisites: 1.0079, ListWorks: 'H' },
  { $key: 2, ClaimNumber: 2, ClaimDate: '2019-02-01', Customer: 'Helium', CustomerRequisites: 4.0026, ListWorks: 'He' },
  { $key: 3, ClaimNumber: 3, ClaimDate: '2019-02-02', Customer: 'Lithium', CustomerRequisites: 6.941, ListWorks: 'Li' },
  { $key: 4, ClaimNumber: 4, ClaimDate: '2019-02-02', Customer: 'Beryllium', CustomerRequisites: 9.0122, ListWorks: 'Be' },
  { $key: 5, ClaimNumber: 5, ClaimDate: '2019-02-03', Customer: 'Boron', CustomerRequisites: 10.811, ListWorks: 'B' },
  { $key: 6, ClaimNumber: 6, ClaimDate: '2019-02-02', Customer: 'Carbon', CustomerRequisites: 12.0107, ListWorks: 'C' },
  { $key: 7, ClaimNumber: 7, ClaimDate: '2019-02-02', Customer: 'Nitrogen', CustomerRequisites: 14.0067, ListWorks: 'N' },
  { $key: 8, ClaimNumber: 8, ClaimDate: '2019-02-02', Customer: 'Oxygen', CustomerRequisites: 15.9994, ListWorks: 'O' },
  { $key: 9, ClaimNumber: 9, ClaimDate: '2019-02-02', Customer: 'Fluorine', CustomerRequisites: 18.9984, ListWorks: 'F' },
  { $key: 10, ClaimNumber: 10, ClaimDate: '2019-02-02', Customer: 'Neon', CustomerRequisites: 20.1797, ListWorks: 'Ne' },
];

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
    private brigadeService: BrigadeService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ClaimComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ClaimComponent, dialogConfig);
  }

  onDelete($key) {
    this.dialogService.openConfirmDialog()
      .afterClosed().subscribe(res => {
        if (res) {
          this.service.deleteClaim($key);
          this.notificationService.warn('! Deleted successfully');
        }
      });
  }
}

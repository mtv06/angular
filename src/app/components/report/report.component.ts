import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/shared/services/report.service';
import { TaskBrigadeForMonth } from 'src/app/shared/interfaces/taskBrigadeForMonth.interface';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['monthTask', 'brigadeName', 'countTask'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: ReportService,
              public dialogRef: MatDialogRef<ReportComponent>) { }

  ngOnInit() {
    this.service.getTaskBrigadeForMonth().subscribe((res: TaskBrigadeForMonth[]) => {
      this.dataSource = new MatTableDataSource<TaskBrigadeForMonth>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}

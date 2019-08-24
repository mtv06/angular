import { Component, OnInit } from '@angular/core';
import { Claim } from 'src/app/shared/interfaces/claim.interface';
import { ClaimService } from 'src/app/shared/services/claim.service';
import { BrigadeService } from 'src/app/shared/services/brigade.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatDialogRef } from '@angular/material';
import { ClaimComponent } from '../../claims/claim/claim.component';
import { Brigade } from 'src/app/shared/interfaces/brigade.interface';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  listClaim: Claim[];
  listBrigade: Brigade[];
  check = false;
  rowHeightBrigade = 0;

  constructor(private service: TaskService,
              private claimService: ClaimService,
              private brigadeService: BrigadeService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ClaimComponent>) { }

  ngOnInit() {
    this.claimService.getAllClaim().subscribe((claim: Claim[]) => {
      this.listClaim = claim;
    });
    this.brigadeService.getAllBrigade().subscribe((brigade: Brigade[]) => {
      this.listBrigade = brigade;
    });
  }

  onSubmit() {
    if (this.service.form.valid) {
      console.log(this.service.form.value);
      if (this.service.form.controls.Id.value === 0) {
        this.service.postTask(this.service.form.value).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      } else {
        this.service.putTask(this.service.form.value).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onCheckbox() {
    this.check = !this.check;
    this.rowHeightBrigade = 100;
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}

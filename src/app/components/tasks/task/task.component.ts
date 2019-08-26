import { Component, OnInit, Input } from '@angular/core';
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
  claimNumber: string;
  brigadeName: string;

  constructor(private service: TaskService,
              private claimService: ClaimService,
              private brigadeService: BrigadeService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ClaimComponent>,
              ) { }

  ngOnInit() {
    this.claimService.getAllClaim().subscribe((claim: Claim[]) => {
      this.listClaim = claim;
    });
    this.brigadeService.getAllBrigade().subscribe((brigade: Brigade[]) => {
      this.listBrigade = brigade;
    });
    this.claimNumber = this.service.claimNumber;
    this.brigadeName = this.service.brigadeName;
    this.check = this.service.brigadeConfirmation;
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (this.service.form.controls.Id.value === 0) {
        this.service.postTask(this.service.form.value).subscribe();
        this.notificationService.success('Запись успешно добавлена!');
      } else {
        this.service.putTask(this.service.form.value).subscribe();
        this.notificationService.success('Запись успешно обновлена!');
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onCheckbox() {
    this.check = !this.check;
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}

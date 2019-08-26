import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ClaimService } from 'src/app/shared/services/claim.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

  constructor(private service: ClaimService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ClaimComponent>) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (this.service.form.controls.Id.value === 0) {
        this.service.postClaim(this.service.form.value).subscribe();
        this.notificationService.success('Запись успешно добавлена!');
      } else {
        this.service.putClaim(this.service.form.value).subscribe();
        this.notificationService.success('Запись успешно обновлена!');
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}

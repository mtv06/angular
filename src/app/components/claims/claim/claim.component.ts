import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ClaimService } from 'src/app/shared/services/claim.service';
import { BrigadeService } from 'src/app/shared/services/brigade.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {

  constructor(private service: ClaimService,
    private brigadeService: BrigadeService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ClaimComponent>) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.service.form.valid) {
      this.service.postClaim(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}

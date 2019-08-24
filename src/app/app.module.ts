import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule} from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ClaimsComponent } from './components/claims/claims.component';
import { ClaimComponent } from './components/claims/claim/claim.component';
import { ClaimListComponent } from './components/claims/claim-list/claim-list.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { ClaimService } from './shared/services/claim.service';
import { TaskService } from './shared/services/task.service';
import { BrigadeService } from './shared/services/brigade.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { ReportComponent } from './components/report/report.component';

@NgModule({
  declarations: [
    AppComponent,
    ClaimsComponent,
    ClaimComponent,
    ClaimListComponent,
    TasksComponent,
    TaskComponent,
    ConfirmDialogComponent,
    TaskListComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [ClaimService, TaskService, BrigadeService],
  bootstrap: [AppComponent],
  entryComponents: [ClaimComponent, ConfirmDialogComponent, TaskComponent, ReportComponent]
})
export class AppModule { }

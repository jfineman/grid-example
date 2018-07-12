import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, forwardRef } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './common/shared.module';
import { InformationComponent } from './common/component/information.component';
import { TypeaheadGridComponent } from './grid/component/typeahead-grid.component';
import { DatepickerGridComponent } from './grid/component/datepicker-grid.component';
import { InputGridComponent } from './grid/component/input-grid.component';
import { DialogGridComponent } from './grid/component/dialog-grid.component';
import { ComplexDialogGridComponent } from './grid/component/complex-dialog-grid.component';
import { ComplexDialogContentComponent } from './grid/component/complex-dialog-content.component';
import { LockComponent } from './grid/component/lock.component';
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';
import { NgbDateFormatter } from './common/service/ngb-date-formatter.service';
import { ChangesService } from './common/service/changes.service';
import { ResultService } from './common/service/result.service';
import { DateService } from './common/service/date.service';
import { UtilService } from './common/service/util.service';
import { ValidatorService } from './common/service/validator.service';
import { TodoService } from './todo.service';


@NgModule({
  imports: [BrowserModule, NgbModule.forRoot(), SharedModule],
  declarations: [
      AppComponent,
      InformationComponent,
      TypeaheadGridComponent,
      DatepickerGridComponent,
      InputGridComponent,
      DialogGridComponent,
      ComplexDialogGridComponent,
      ComplexDialogContentComponent,
      LockComponent
  ],
  bootstrap: [AppComponent],

  providers: [
      {
          provide: LocationStrategy, useClass: HashLocationStrategy
      },
      {
          provide: NgbDateParserFormatter, useClass: forwardRef(() => NgbDateFormatter)
      },
      ChangesService,
      ResultService,
      DateService,
      UtilService,
      ValidatorService,
      NgbDateFormatter,
      DatePipe,
      TodoService
  ],
  entryComponents: [
      TypeaheadGridComponent, 
      DatepickerGridComponent, 
      InputGridComponent, 
      DialogGridComponent, 
      ComplexDialogGridComponent, 
      ComplexDialogContentComponent,
      LockComponent
  ]
})
export class AppModule { }

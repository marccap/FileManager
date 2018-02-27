import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListerComponent } from './lister/lister.component';
import { FileSystemService } from './services/file-system.service';
import { HistoryService } from './services/history.service';
import { FileTypeService } from './services/file-type.service';
import { FuzzySizePipe } from './pipes/fuzzy-size.pipe';
import { DropExtensionPipe } from './pipes/drop-extension.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  declarations: [
    ListerComponent,
    FuzzySizePipe,
    DropExtensionPipe
  ],
  exports: [
    ListerComponent
  ]
})
export class FMModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FMModule,
      providers: [FileSystemService, HistoryService, FileTypeService]
    };
  }
}

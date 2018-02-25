import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListerComponent } from './lister/lister.component';
import { FileSystemService } from './services/file-system.service';
import { HistoryService } from './services/history.service';
import { FileTypeService } from './services/file-type.service';
import { FuzzySizePipe } from './pipes/fuzzy-size.pipe';
import { GetExtensionPipe } from './pipes/get-extension.pipe';
import { DropExtensionPipe } from './pipes/drop-extension.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ListerComponent,
    FuzzySizePipe,
    GetExtensionPipe,
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

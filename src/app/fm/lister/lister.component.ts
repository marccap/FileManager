import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { FileSystemService } from '../services/file-system.service';
import { Directory } from '../model/directory';
import { File } from '../model/file';
import { HistoryService } from '../services/history.service';
import { FileTypeService } from '../services/file-type.service';
import * as _ from 'lodash';
import { FI } from '../model/fi';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.scss']
})
export class ListerComponent implements OnInit {
  items: FI[];
  status = 200;

  constructor(private fileSystemService: FileSystemService, private historyService: HistoryService, private fileTypeService: FileTypeService) { }

  ngOnInit() {
    this.changeDirectory('c:/');
  }

  changeDirectory(path: string, addToHistory = true) {
    path = this.makePath(path);
    this.status = 0;
    this.items = new Array<FI>();
    if (addToHistory) {
      this.historyService.add(path);
    }
    this.fileSystemService.getFiles(path).subscribe(files => {
      this.items = files;
      this.status = 200;
    }, (err: HttpErrorResponse) => {
      this.status = err.status
    });
  }

  get currentPath() {
    return this.historyService.getCurrent();
  }

  openItem(fi: FI) {
    if (fi.isDirectory) {
      const path = this.makePath(fi.physicalPath);
      this.changeDirectory(path);
      return;
    }
  }

  makePath(path: string) {
    return path.slice(-1) == '/' ? path : path + '/';
  }

  get canGoBack() {
    return this.historyService.canGoBack();
  }

  back() {
    const path = this.historyService.goBack();
    this.changeDirectory(path, false);
  }

  get canGoForward() {
    return this.historyService.canGoForward();
  }

  forward() {
    const path = this.historyService.goForward();
    this.changeDirectory(path, false);
  }

  get canGoUp() {
    return this.historyService.getCurrent().lastIndexOf('/') != this.historyService.getCurrent().indexOf('/');
  }

  up() {
    const parentPath = this.parentPath(this.historyService.getCurrent());
    this.changeDirectory(parentPath);
  }

  parentPath(input: string) {
    const lastSlash = input.slice(0, -1).lastIndexOf('/')
    return input.slice(0, lastSlash);
  }

  getIcon(fi: FI) {
    return this.fileTypeService.getIcon(fi);
  }
}

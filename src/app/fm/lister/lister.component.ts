import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileSystemService } from '../services/file-system.service';
import { Directory } from '../model/directory';
import { File } from '../model/file';
import { HistoryService } from '../services/history.service';
import { FileTypeService } from '../services/file-type.service';
import * as _ from 'lodash';
import { FI } from '../model/fi';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.scss']
})
export class ListerComponent implements OnInit {
  title = 'app';
  currentDirectory: Directory;
  filter = '';
  loading = true;

  constructor(private fileSystemService: FileSystemService, private historyService: HistoryService, private fileTypeService: FileTypeService) { }

  ngOnInit() {
    this.changeDirectory('c:/');
  }

  changeDirectory(path: string, addToHistory = true) {
    this.loading = true;
    path = this.makePath(path);
    this.currentDirectory = new Directory();
    if (addToHistory) {
      this.historyService.add(path);
    }
    if (this.filter === '') {
      this.fileSystemService.getFiles(path).subscribe(files => this.currentDirectory = files);
    }
    this.loading = false;
  }

  openItem(fi: FI) {
    if (fi.isDirectory) {
      const path = this.makePath(fi.physicalPath);
      this.changeDirectory(path);
      return;
    }
  }

  getItems() {
    if (this.filter == '') {
      return this.currentDirectory.fIs;
    }

    let filteredFis = new Array<FI>();

    for (let fi of this.currentDirectory.fIs) {
      if (fi.name.indexOf(this.filter) != -1) {
        filteredFis.push(fi);
      }
    }

    return filteredFis;
  }

  addressKeyDown() {
    if (this.currentPath.slice(-1) == '/') {

    }
  }

  makePath(path: string) {
    return path.slice(-1) == '/' ? path : path + '/';
  }

  get currentPath() {
    return this.historyService.getCurrent();
  }

  canGoBack() {
    return this.historyService.canGoBack();
  }

  back() {
    const path = this.historyService.goBack();
    this.changeDirectory(path, false);
  }

  canGoForward() {
    return this.historyService.canGoForward();
  }

  forward() {
    const path = this.historyService.goForward();
    this.changeDirectory(path, false);
  }

  up() {
    const parentPath = this.parentPath(this.historyService.getCurrent());
    this.changeDirectory(parentPath);
  }

  parentPath(input: string) {
    const lastSlash = input.slice(0, -1).lastIndexOf('/');

    if (lastSlash === -1) {
      return input;
    }

    return input.slice(0, lastSlash);
  }

  getIcon(fi: FI) {
    return this.fileTypeService.getIcon(fi.name, fi.isDirectory);
  }
}

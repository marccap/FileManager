import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { FileSystemService } from '../services/file-system.service';
import { HistoryService } from '../services/history.service';
import { FileTypeService } from '../services/file-type.service';
import * as _ from 'lodash';
import { FI } from '../model/fi';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.scss']
})
export class ListerComponent implements OnInit {
  items: FI[];
  allSelected = false;
  status = 200;
  closeResult: string;

  constructor(private fileSystemService: FileSystemService, private historyService: HistoryService, private fileTypeService: FileTypeService, private modalService: NgbModal) { }

  ngOnInit() {
    this.changeDirectory('');
  }

  changeDirectory(path: string, addToHistory = true) {
    path = this.makePath(path);
    this.status = 100;
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

  selectAll() {
    this.allSelected = !this.allSelected;
    if (this.allSelected) {
      for (let item of this.items) {
        item.selected = true;
      }
    }
    else {
      for (let item of this.items) {
        item.selected = false;
      }
    }
  }

  toggleSelect() {
    this.allSelected = false;
    for (let item of this.items) {
      item.selected = !item.selected;
    }
  }

  makePath(path: string) {
    return path.slice(-1) == '/' ? path : path + '/';
  }

  get itemsSelected() {
    for (let item of this.items) {
      if (item.selected) {
        return true;
      }
    }
    return false;
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
    return this.historyService.getCurrent() !== '/';
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

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

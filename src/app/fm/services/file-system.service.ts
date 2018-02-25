import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Directory } from '../model/directory';
import 'rxjs/add/operator/map';


@Injectable()
export class FileSystemService {
  constructor(private http: HttpClient) { }
  getFiles(path: string): Observable<Directory> {
    const url = 'http://localhost:49175/list/' + path;
    return this.http.get<Directory>(url);
  }
}

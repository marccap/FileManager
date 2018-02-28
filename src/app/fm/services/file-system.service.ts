import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FI } from '../model/fi';
import 'rxjs/add/operator/map';

@Injectable()
export class FileSystemService {
  constructor(private http: HttpClient) { }
  getFiles(path: string): Observable<FI[]> {
    const url = 'http://localhost:49175/list/' + path;
    return this.http.get<FI[]>(url);
  }
}

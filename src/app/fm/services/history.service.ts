import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HistoryService {
    private items = new Array<string>();
    private pos = 0;

    public add(path: string) {
        const lastPos = this.items.length - 1;
        if (path === this.items[lastPos]) {
            this.pos = lastPos;
        }
        else {
            this.pos = this.items.push(path) - 1;
        }
    }

    public getCurrent() {
        return this.items[this.pos];
    }

    public canGoBack() {
        return this.pos > 0;
    }

    public goBack() {
        if (this.canGoBack()) {
            this.pos--;
        }
        return this.getCurrent();
    }

    public canGoForward() {
        return this.pos < this.items.length - 1;
    }

    public goForward() {
        if (this.canGoForward())
            this.pos++;
        return this.getCurrent();
    }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fuzzySize'
})
export class FuzzySizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args) {
      return '';
    }

    const kb = Math.pow(1024, 1);
    const mb = Math.pow(1024, 2);
    const gb = Math.pow(1024, 3);
    const tb = Math.pow(1024, 4);
    const pb = Math.pow(1024, 5);

    if (value < 1 * kb) {
      return value + " B";
    }

    if (value < 1000 * kb) {
      return Math.round(value / kb) + " KB";
    }

    if (value < 1000 * mb) {
      return Math.round(value / mb) + " MB";
    }

    if (value < 1000 * gb) {
      return Math.round(value / gb) + " GB";
    }

    if (value < 1000 * tb) {
      return Math.round(value / tb) + " TB";
    }

    return Math.round(value / pb) + " PB";
  }
}

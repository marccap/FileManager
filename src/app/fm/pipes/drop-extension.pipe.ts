import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dropExtension'
})
export class DropExtensionPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const lastDot = value.lastIndexOf('.');

    if (lastDot === -1) {
      return value;
    }

    return value.slice(0, lastDot).toLowerCase();
  }
}
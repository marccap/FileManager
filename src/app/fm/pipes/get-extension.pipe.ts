import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getExtension'
})
export class GetExtensionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const lastDot = value.lastIndexOf('.');

    if (lastDot === -1) {
      return '';
    }

    return value.substring(lastDot + 1).toLowerCase();
  }

}
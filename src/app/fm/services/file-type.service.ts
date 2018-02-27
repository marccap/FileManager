import { Injectable } from '@angular/core';
import { FI } from '../model/fi';

@Injectable()
export class FileTypeService {
  public getExtension(fileName: string) {
    const lastDot = fileName.lastIndexOf('.');

    if (lastDot === -1) {
      return '';
    }

    return fileName.substring(lastDot + 1).toLowerCase();
  }

  public getIcon(item: FI) {
    if (item.isDirectory) {
      return 'fa fa-folder folderColor';
    }

    switch (this.getExtension(item.name)) {
      case 'txt':
      case 'nfo':
      case 'doc':
      case 'docx':
      case 'rtf':
      case 'odf':
      case 'pdf':
      case 'ini':
      case 'inf':
        return 'fa fa-file-alt textFileColor';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
      case 'bmp':
        return 'fa fa-image';
      case 'avi':
      case 'divx':
      case 'mpg':
      case 'mpeg':
      case 'vob':
      case 'mkv':
      case 'wmv':
      case 'flv':
      case 'ogv':
      case 'mov':
      case 'qt':
      case 'rm':
      case 'asf':
      case 'mp4':
      case 'm2v':
      case 'm4v':
      case '3gp':
      case 'f4v':
        return 'fa fa-film videoFileColor';
      case 'mp3':
      case 'wav':
      case 'flac':
      case 'ape':
      case 'ogg':
      case 'wma':
      case 'mp2':
      case 'au':
      case 'pcm':
      case 'aiff':
      case 'aac':
      case 'alac':
        return 'fa fa-file-audio audioFileColor';
      case 'zip':
      case 'rar':
      case '7z':
      case 'gz':
      case 'tar':
      case 'tgz':
      case 'bz2':
      case 'far':
      case 'arj':
      case 'cpio':
      case 'cab':
      case 'dmg':
      case 'jar':
        return 'fa fa-file-archive'
    }
    return 'fa fa-file textFileColor';
  }
}

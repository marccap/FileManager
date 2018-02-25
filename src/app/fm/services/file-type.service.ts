import { Injectable } from '@angular/core';

@Injectable()
export class FileTypeService {
  public getExtension(fileName: string) {
    const lastDot = fileName.lastIndexOf('.');

    if (lastDot === -1) {
      return '';
    }

    return fileName.substring(lastDot + 1).toLowerCase();
  }

  public getIcon(fileName: string, isDirectory = false) {
    if (isDirectory) {
      return 'glyphicon-folder-close folderColor';
    }

    switch (this.getExtension(fileName)) {
      case 'txt':
      case 'nfo':
      case 'doc':
      case 'docx':
      case 'rtf':
      case 'odf':
      case 'pdf':
        return 'glyphicon-align-left textFileColor';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
      case 'bmp':
        return 'glyphicon-picture';
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
        return 'glyphicon-film videoFileColor';
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
        return 'glyphicon-music audioFileColor';
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
        return 'glyphicon-compressed'
    }
    return 'glyphicon-file textFileColor';
  }

  public getFileTypeDesc(fileName: string, isDirectory = false) {
    if (isDirectory) {
      return 'Directory';
    }

    switch (this.getExtension(fileName)) {
      case 'txt':
      case 'nfo':
      case 'doc':
      case 'docx':
      case 'rtf':
      case 'odf':
      case 'pdf':
        return 'Document';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
      case 'bmp':
        return 'Image';
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
        return 'Video';
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
        return 'Audio';
      case 'zip':
      case 'rar':
      case '7z':
      case 'gz':
      case 'tar':
      case 'tgz':
      case 'bz2':
      case 'far':
      case 'arj':
      case 'arj':
      case 'cpio':
      case 'cab':
      case 'dmg':
      case 'jar':
        return 'Compressed';
    }
    return this.getExtension(fileName) + '-file';
  }
}

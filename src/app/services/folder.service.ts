import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Folder } from '../models/folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  /*folderList: AngularFireList<any> = this.firebase.list('');  */
  constructor(/*private firebase: AngularFireDatabase*/) { }

  /*getFolders() {
    return this.folderList = this.firebase.list('folders');
  }

  addFolder(folder: Folder) {
    this.folderList.push({
      name: folder.name
    });
  }*/
}

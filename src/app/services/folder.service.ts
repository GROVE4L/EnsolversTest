import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Folder } from 'src/app/models/folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  folderList: AngularFireList<any>;  
  constructor(private firebase: AngularFireDatabase) { }

  getFolders() {
    return this.folderList = this.firebase.list('folders');
  }

  addFolder(folderName: string) {
    this.folderList.push({
      name: folderName
    })
  }
  
  deleteFolder($key: string) {    
    this.folderList.remove($key).then(() => {
      let ref = this.firebase.database.ref('items');
      ref.orderByChild('folder').equalTo($key).once('value', snapshot => {
           const updates = {};
           snapshot.forEach(child => updates[child.key] = null);
           ref.update(updates);
      });
    });
    
  }

  getFolder($key: string) {    
    return this.firebase.list('folders', ref => ref.orderByKey().equalTo($key));
  }

}

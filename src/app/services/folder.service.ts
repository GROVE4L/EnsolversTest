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
    this.folderList.remove($key);
  }

  getFolder($key: string) {
    console.log("Buscar key "+$key);
    this.firebase.database.ref('folders').orderByKey().equalTo($key).on('value', (snapshot) => {      
      let snap = snapshot.val()
      let key = (Object.keys(snap)).toString();
      let folder = new Folder();
      folder.$key = key;
      folder.name = snap[key].name;
    });
  }

}

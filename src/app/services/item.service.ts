import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  
  itemList: AngularFireList<any>;  
  constructor(private firebase: AngularFireDatabase) { }

  getItems(folderKey: string) {
    return this.itemList = this.firebase.list('items', ref => ref.orderByChild('folder').equalTo(folderKey));
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  
  itemList: AngularFireList<any>;  
  constructor(private firebase: AngularFireDatabase) { }

  getItems(folderKey: string) {
    return this.itemList = this.firebase.list('items', ref => ref.orderByChild('folder').equalTo(folderKey));
  }

  addItem(itemFolder: string, itemName: string) {
    this.firebase.list('items').push({
      name: itemName,
      folder: itemFolder,
      checked: false
    });
  }

  deleteItem($key: string) {
    return this.itemList.remove($key);
  }

  updateItem($key: string, newName: string) {
    return this.firebase.list('items').update($key,  {
      name: newName
    });
  }

  setDoneItem($key: string, doneValue: boolean) {
    this.firebase.list('items').update($key,  {
      checked: doneValue
    });
  }
}

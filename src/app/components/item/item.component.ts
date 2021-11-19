import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Folder } from 'src/app/models/folder';
import { FolderService } from 'src/app/services/folder.service';

import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
declare var bootstrap: any;
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit,OnDestroy {

  public itemList: Item[];
  private folderSubscribe;
  private itemSubscribe;
  private modalEdit;

  public editingItem: Item = new Item();
  public selectedFolder: Folder = new Folder();

  constructor(private folderService: FolderService, private itemService: ItemService, private router: ActivatedRoute) { }  
  
  ngOnInit(): void {    
    this.modalEdit = new bootstrap.Modal(document.getElementById('editModal'), {
      keyboard: false
    });

    let folderKey = this.router.snapshot.params.id
    this.folderSubscribe = this.folderService.getFolder(folderKey)
    .snapshotChanges()
    .subscribe(item => {        
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;        
        this.selectedFolder = (x as Folder);
      });      
    });

    this.itemSubscribe = this.itemService.getItems(folderKey)
    .snapshotChanges()
    .subscribe(item => {
      this.itemList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;        
        this.itemList.push(x as Item);
      });
    });
  }
  ngOnDestroy() {
    if(this.folderSubscribe != null)
      this.folderSubscribe.unsubscribe();
    if(this.itemSubscribe != null)
      this.itemSubscribe.unsubscribe();
  }

  addItemAction(actionForm: NgForm) {
    let data = actionForm.value;    
    try {      
      this.itemService.addItem(this.selectedFolder.$key, data.itemName);
      console.log("OK");
    }
    catch {
      console.log("Error");
    }
  }

  deleteItem(keyItem: string) {
    this.itemService.deleteItem(keyItem).then(()=> {
      console.log("Item deleted OK");
    })
    .catch(()=> {
      console.log("Item deleted Fail");
    });
  }
  onChangeDone(item: Item) {
    item.checked ? this.itemService.setDoneItem(item.$key, false) : this.itemService.setDoneItem(item.$key, true);
  }

  openEditor(item: Item) {    
    this.editingItem = item;
    this.modalEdit.show();
  }

  editItem(editForm: NgForm) {
    let data = editForm.value;    
    this.itemService.updateItem(this.editingItem.$key, data.editNewName).then(() => {
      console.log("Item edited OK");
    })
    .catch(()=> {
      console.log("Item edited Fail");
    });
    this.modalEdit.hide();        
  }
}

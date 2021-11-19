import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Folder } from 'src/app/models/folder';
import { FolderService } from 'src/app/services/folder.service';

import { Item } from 'src/app/models/item';
import { ItemService } from 'src/app/services/item.service';
import { AngularFireAuth } from '@angular/fire/auth';
declare var bootstrap: any;
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit,OnDestroy {

  public itemList: Item[] = [];
  private folderSubscribe;
  private itemSubscribe;
  private modalEdit;

  public editingItem: Item = new Item();
  public selectedFolder: Folder = new Folder();

  public loadingFolder: boolean;
  public loadingItems: boolean;

  private authSubscribe;
  constructor(private afAuth: AngularFireAuth, private folderService: FolderService, private toast:ToastrService, private itemService: ItemService, private activatedRouter: ActivatedRoute, private toastr: ToastrService, private router: Router) { }  
  
  ngOnInit(): void {    

    this.authSubscribe = this.afAuth.authState.subscribe(user => {
      if(!user) {            
        this.toastr.error("You must be logged in", "");
        this.router.navigate(['/login']);
      }
      else {
        this.modalEdit = new bootstrap.Modal(document.getElementById('editModal'), {
          keyboard: false
        });
    
        let folderKey = this.activatedRouter.snapshot.params.id;
        this.loadingFolder = true;
    
        this.folderSubscribe = this.folderService.getFolder(folderKey)
        .snapshotChanges()
        .subscribe(item => {        
          item.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;        
            this.selectedFolder = (x as Folder);        
          });
          if(this.selectedFolder.$key == undefined)
            this.router.navigate(['/folders']);      
          else
            this.loadingFolder = false;
        });
    
        this.loadingItems = true;
        this.itemSubscribe = this.itemService.getItems(folderKey)
        .snapshotChanges()
        .subscribe(item => {
          this.itemList = [];
          item.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;        
            this.itemList.push(x as Item);
          });
          this.loadingItems = false;
        });
      }
    });    
  }
  ngOnDestroy() {
    if(this.folderSubscribe != null)
      this.folderSubscribe.unsubscribe();
    if(this.itemSubscribe != null)
      this.itemSubscribe.unsubscribe();
    if(this.authSubscribe != null)
      this.authSubscribe.unsubscribe();
  }

  addItemAction(actionForm: NgForm) {
    let data = actionForm.value;    
    try {      
      this.itemService.addItem(this.selectedFolder.$key, data.itemName);
      this.toastr.success('New item created!','Success'); 
      actionForm.resetForm();     
    }
    catch {
      console.log("Error");
      this.toastr.error('Unexpected error.','Error');      
    }
  }

  deleteItem(keyItem: string) {
    try {
      this.itemService.deleteItem(keyItem);
      this.toastr.success('Item has been removed.','Success');       
    }
    catch {
      this.toastr.error('Unexpected error on delete item.','Error');      
    }
  }
  onChangeDone(item: Item) {
    item.checked ? this.itemService.setDoneItem(item.$key, false) : this.itemService.setDoneItem(item.$key, true);
  }

  openEditor(item: Item) {    
    this.editingItem = item;
    this.modalEdit.show();
  }

  editItem(editForm: NgForm) {
    try {
      let data = editForm.value;        
      this.itemService.updateItem(this.editingItem.$key, data.editNewName);
      this.toastr.success('Item has been edited.','Success');
    }
    catch {
      this.toastr.error('Unexpected error on edit item name.','Error');
    }
    finally {
      this.modalEdit.hide();
    }    
  }
}

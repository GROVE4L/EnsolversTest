import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Folder } from 'src/app/models/folder';
import { Item } from 'src/app/models/item';
import { FolderService } from 'src/app/services/folder.service';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public itemList: Item[];
  constructor(private folderService: FolderService, private itemService: ItemService, private router: ActivatedRoute) { }

  
  ngOnInit(): void {    
    let folderKey = this.router.snapshot.params.id

    this.folderService.getFolder(folderKey);

   /* this.itemService.getItems(folderKey)
    .snapshotChanges()
    .subscribe();

    this.itemService.getItems(folderKey)
    .snapshotChanges()
    .subscribe(item => {
      this.itemList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;        
        console.log(x as Item)    
        this.itemList.push(x as Item);

      });
    });*/
  }

}

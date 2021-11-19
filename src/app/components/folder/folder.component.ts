import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Folder } from 'src/app/models/folder';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit, OnDestroy {

  public folderList: Folder[];
  private folderSubscribe: any;
  public loading: boolean;
  constructor(private toastr: ToastrService,
    private folderService: FolderService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.folderSubscribe = this.folderService.getFolders()
    .snapshotChanges()
    .subscribe(item => {
      this.folderList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;        
        this.folderList.push(x as Folder);
      });
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if(this.folderSubscribe != null)
      this.folderSubscribe.unsubscribe();
  }

  addFolderAction(folderForm: NgForm) {
    let data = folderForm.value;          
    try {
      this.folderService.addFolder(data.folderName);
      folderForm.resetForm();
      this.toastr.success('New task created!.','Success');  
    }
    catch {
      this.toastr.error('Unexpected error.','Error');      
    }
  
  }
  deleteFolder($key: string) {    
    this.folderService.deleteFolder($key);
  }

  viewFolder(folder: Folder) {    
    this.router.navigate(['/items', { id: folder.$key }]);
  }
}

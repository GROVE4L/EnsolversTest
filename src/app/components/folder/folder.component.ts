import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Folder } from 'src/app/models/folder';
import { FolderService } from 'src/app/services/folder.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit, OnDestroy {

  public folderList: Folder[];
  private folderSubscribe: any;
  public loading: boolean;
  private authSubscribe;
  constructor(private toastr: ToastrService,
    private folderService: FolderService,
    private router: Router,
    private afAuth: AngularFireAuth
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.authSubscribe = this.afAuth.authState.subscribe(user => {
      if(!user) {            
        this.toastr.error("You must be logged in", "");
        this.router.navigate(['/login']);
      }
      else {        
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
    });   
  }

  ngOnDestroy() {
    if(this.folderSubscribe != null)
      this.folderSubscribe.unsubscribe();
    if(this.authSubscribe != null)
      this.authSubscribe.unsubscribe();
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

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

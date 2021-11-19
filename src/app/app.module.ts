import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//toastr (mensajes popup)
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

//Components
import { LoginComponent } from './components/login/login.component';
import { FolderComponent } from './components/folder/folder.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FolderComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,    
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    

    BrowserAnimationsModule, // required animations module for toastrModule
    ToastrModule.forRoot( { //Cambiar la configuracion default del toastr
      timeOut: 2000,
      closeButton: true,
    }), // ToastrModule added
    
    AngularFireModule.initializeApp(environment.firebase), //Firebase
    AngularFireDatabaseModule //Firebase
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

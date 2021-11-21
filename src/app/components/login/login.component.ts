import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from  "@angular/fire/auth";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private afAuth: AngularFireAuth,private router: Router, private toast: ToastrService) { }

  private authSubscribe;
  ngOnInit(): void {
    this.authSubscribe = this.afAuth.authState.subscribe(user => {
      if(user) {            
        this.router.navigate(['/folders']);
        this.toast.success("Already logged in","");   
      }
    });
  }

  ngOnDestroy() {
    if(this.authSubscribe != null)
      this.authSubscribe.unsubscribe();
  }

  login(loginForm: NgForm) {
    let data = loginForm.value; 
    this.afAuth.signInWithEmailAndPassword(data.email, data.password)
    .then(value => {      
      this.router.navigate(['/folders']);
      this.toast.success("Login success","");     
    })
    .catch(err => {
      let errorMessage: string;
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "User not found.";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong password.";
          break;        
        default:
          errorMessage = "An undefined Error happened.";
      }
      console.log('Error: ', err.message);
      this.toast.error(errorMessage,"Login Error");
    });
  }

}

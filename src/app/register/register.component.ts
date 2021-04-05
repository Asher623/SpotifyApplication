import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../RegisterUser';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser: RegisterUser;
  public warning: string;
  public success: boolean;
  public loading: boolean;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.registerUser = new RegisterUser();
    this.success = false;
    this.loading = false;
  }

  onSubmit(f: NgForm): void {

    if(this.registerUser.userName != "" && this.registerUser.password == this.registerUser.password2){
      this.loading = true;
      this.auth.register(this.registerUser).subscribe(
        (success) => {
          
          localStorage.setItem('access_token',success.token);
          this.success = true;
          this.warning = null;
          this.loading = false;
          
        },
        (err) => {
          this.warning = err.error.message;
          if (typeof this.warning === "object"){
            this.warning = null;
          }
          this.loading = false;
          this.success = false;
        }
      );
    }

    

  }



}

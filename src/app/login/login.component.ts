import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:User;
  public warning:string;
  public loading:boolean;

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.loading = false;
  }

  onSubmit(f: NgForm): void {

    if(this.user.userName != "" && this.user.password != ""){
      this.loading = true;
      this.auth.login(this.user).subscribe(
        (success) => {
          
          localStorage.setItem('access_token',success.token);
          this.router.navigate(['/newReleases']);
        },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        }
      );
    }
  }
}

import { CookieService } from 'ngx-cookie-service';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/model/auth.service';
import { Credential } from 'src/app/model/credentials';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  credential!: Credential;
  errorAuth!: boolean;

    constructor(private cookie: CookieService, private authService: AuthService) {}

    ngOnInit(){
        this.authService.clearLoginData();
        this.credential = new Credential();
        this.authService.logoutWithoutRedirect();
    }

    login(){

      this.cookie.set("Password",this.credential.password);
      this.cookie.set("Username", this.credential.username);

      this.authService.authenticate(this.credential, () => {
          this.errorAuth = true;
      })
    }
}

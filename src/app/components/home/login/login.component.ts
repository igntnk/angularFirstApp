import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/model/auth.service';
import { Credential } from 'src/app/model/credentials';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credential!: Credential;
    errorAuth!: boolean;

    constructor(private authService: AuthService) {}

    ngOnInit(){
        this.authService.clearLoginData();
        this.credential = new Credential();
        this.authService.logoutWithoutRedirect();
    }

    login(){
        this.authService.authenticate(this.credential, () => {
            this.errorAuth = true;
        })
    }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../@servicios/custom/user.service';
import { UserModel } from '../@model/custom/user.model';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    rFormLogin: FormGroup;

    constructor(private router:Router, private fb: FormBuilder, private srvUser: UserService) { 
        this.rFormLogin = this.fb.group({
            nombre: [null, Validators.compose([Validators.required, Validators.maxLength(50)])],
            pass: [null, Validators.compose([Validators.required, Validators.maxLength(50)])]
          });
    }

    ngOnInit() { }

    confirmateLogin(obj: UserModel){        
        this.srvUser.validateLogin(obj).subscribe(
            resp => {
                this.router.navigate(['core/dashboard']);
            },
            error => {
                alert(error.error.data);
            }
        );
    }
    
}
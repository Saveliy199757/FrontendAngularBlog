import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  submitted: boolean = false;
  message: string = '';

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Введите, пожалуйста, данные для авторизации'
      }
    })
   // console.log(this.form.errors)
  }

  isErrors(fieldName: string, errorName: string): boolean {
    if (!this.form.get(fieldName)?.errors) {
      return false
    }
    if (this.form.get(fieldName)?.errors?.[errorName]) {
      return true
    }
    return false
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    }, () => {
      this.submitted = false
    })
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {statusForm} from "../../enum/status-form";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  StatusForm = statusForm;

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  }) ;

  ngOnInit(): void {
    console.log(this.form.get('email')?.touched)
  }

  submit() {
    console.log(this.form)
    if (this.form.status === statusForm.invalid) {
      return
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  error_username: string = '';
  error_password: string = '';
  error_login: string = '';

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(){
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onLogin() {
    this.error_username = '';
    this.error_password = '';
    this.error_login = '';
    if (this.form.get('username')?.errors?.['required']) {
      this.error_username = 'Unesite korisnicko ime!';
      return;
    } else if (this.form.get('password')?.errors?.['required']) {
      this.error_password = 'Unesite lozinku!';
      return;
    }
    if (!this.userService.login(this.form.get('username')?.value, this.form.get('password')?.value)) {
      this.error_login = 'Nije vam ispravno korisničko ime ili lozinka!';
      this.form.reset();
    }

  }
}

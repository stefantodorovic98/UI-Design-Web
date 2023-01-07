import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit  {
  form!: FormGroup;
  error_msg: string = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(){
    this.form = new FormGroup({
      oldPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
    });
  }

  onSave() {
    this.error_msg = '';
    if (this.form.get('oldPassword')?.errors?.['required'] ||
    this.form.get('newPassword')?.errors?.['required']) {
      this.error_msg = 'Sva polja moraju biti popunjena!';
      return;
    } else if (this.form.get('oldPassword')?.value === this.form.get('newPassword')?.value) {
      this.error_msg = 'Polja moraju biti razlicita';
      return;
    } else {
      if (!this.userService.changeUserPassword(this.form.get('oldPassword')?.value, this.form.get('newPassword')?.value)) {
        this.error_msg = 'Nije ispravna stara lozinka!';
        this.form.reset();
      }
    }
  }

}

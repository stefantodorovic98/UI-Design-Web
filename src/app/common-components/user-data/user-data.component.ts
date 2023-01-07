import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserData } from '../models/user-data.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  error_msg: string = '';
  private userDataSub!: Subscription;
  user!: UserData;

  constructor(
    private userService: UserService
  ){}

  ngOnInit(){
    this.userDataSub = this.userService.getUserDataUpdated().subscribe(
      (userResponse: {userData: UserData}) => {
        this.user = userResponse.userData;
        this.form = new FormGroup({
          firstname: new FormControl(this.user.firstname, [Validators.required]),
          lastname: new FormControl(this.user.lastname, [Validators.required]),
          phone: new FormControl(this.user.phone, [Validators.required]),
          address: new FormControl(this.user.address, [Validators.required])
        });
      }
    );
    this.userService.getLoggedUser();
  }

  ngOnDestroy() {
    this.userDataSub.unsubscribe();
  }

  onSave() {
    this.error_msg = '';
    if (this.form.get('firstname')?.errors?.['required'] ||
    this.form.get('lastname')?.errors?.['required'] ||
    this.form.get('phone')?.errors?.['required'] ||
    this.form.get('address')?.errors?.['required']) {
      this.error_msg = 'Sva polja moraju biti popunjena!';
      return;
    } else {
      this.userService.saveUserData(
        this.form.get('firstname')?.value,
        this.form.get('lastname')?.value,
        this.form.get('phone')?.value,
        this.form.get('address')?.value
      );
    }
  }


}

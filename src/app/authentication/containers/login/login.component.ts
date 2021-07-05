import { AuthAction } from "@actions";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VALIDATIONS } from '@constants';
import { Authentication } from "@models";
import { Store } from "@ngrx/store";
import { GlobalState } from "@store";
import { ValidationUtils } from '../../../share/validation.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  isHiddenPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<GlobalState>,
  ) {
    this.createFormFields();
  }

  ngOnInit(): void { }

  private createFormFields() {
    this.formGroup = this.formBuilder.group({
      mail: [null, Validators.compose([
        Validators.required,
        Validators.pattern(VALIDATIONS.EMAIL_REGEX),
      ])],
      password: [null, Validators.compose([
        Validators.required
      ])],
    });
  }

  submit() {
    // Validate form data
    const controls = this.formGroup.controls;
    if (this.formGroup.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    const payload: Authentication = {
      email: controls.mail.value,
      password: controls.password.value
    };

    this.store.dispatch(AuthAction.LoginBegin({ payload }));
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    return ValidationUtils.isControlHasError(this.formGroup, controlName, validationType);
  }

}

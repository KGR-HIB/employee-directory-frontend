import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../core/constants/app-routes.constant';
import { CONSTANTS } from '../../../core/constants/common.constant';
import { ValidationUtils } from '../../../share/validation.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  isHiddenPassword = true;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createFormFields();
  }

  private createFormFields() {
    this.formGroup = this.formBuilder.group({
      mail: [null, Validators.compose([
        Validators.required,
        Validators.pattern(CONSTANTS.EMAIL_REGEX),
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
    this.loading = true;
    // Get form data
    const authData = {
      mail: controls.mail.value,
      password: controls.password.value
    };
    console.log(authData);
    // TODO: call login service
    // TODO: manage 401 message
    this.router.navigateByUrl(APP_ROUTES.EMPLOYEES).then();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    return ValidationUtils.isControlHasError(this.formGroup, controlName, validationType);
  }

}

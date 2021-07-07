import { FormControl, FormGroup } from "@angular/forms";

export class ValidationUtils {

  /**
   * Checking control validation
   *
   * @param formGroup: Form group
   * @param controlName: Form control name
   * @param validationType: Validation name
   */
  static isControlHasError(formGroup: FormGroup, controlName: string, validationType: string): boolean {
    const control = formGroup.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }

  /**
   * Checking single control validation
   *
   * @param control: Form control name
   * @param validationType: Validation name
   */
  static isSingleControlHasError(control: FormControl, validationType: string): boolean {
    if (!control) {
      return false;
    }
    return control.hasError(validationType) && (control.dirty || control.touched);
  }
}
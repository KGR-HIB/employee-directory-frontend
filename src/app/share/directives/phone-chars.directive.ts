import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Directive to validate a phone number. Only allow this pattern [^- +()0-9]
 */
@Directive({
  selector: '[appPhoneChars]'
})
export class PhoneCharsDirective {

  private el: NgControl;

  constructor(private ngControl: NgControl) {
    this.el = ngControl;
  }

  // Listen for the input event to also handle copy and paste.
  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Use NgControl patchValue to prevent the issue on validation
    this.el?.control?.patchValue(value.replace(/[^- +()0-9]+/g, ''));
  }
}

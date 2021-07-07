import { Component, EventEmitter, Input, Output, forwardRef } from "@angular/core";
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

/**
 * Filter generic
 *
 * @author bcueva
 * @version 1.0
 */
@Component({
  selector: "app-employee-generic-filter",
  templateUrl: "./employee-generic-filter.component.html",
  styleUrls: ["./employee-generic-filter.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmployeeGenericFilterComponent),
      multi: true
    },
  ]
})
export class EmployeeGenericFilterComponent implements ControlValueAccessor {
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() clickAdvancedFilters: EventEmitter<void> = new EventEmitter();

  value!: string;
  /** Event handler when change */
  onChange: any = () => {}
  /** Event handler when touched */
  onTouch: any = () => {}

  constructor() {}

  get hasValue(): boolean {
    return this.value !== null && this.value.length > 0;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  clickSearchHandler(): void {
    this.search.emit(this.value);
  }

  clickAdvancedFilersHandler(): void {
    this.clickAdvancedFilters.emit();
  }

  clickClearHandler(): void {
    this.value = "";
    this.onChange(this.value);
    this.search.emit(this.value);
  }

  keyUpInputHandler(event: any): void {
    if (event.keyCode === 13) {
      this.search.emit(this.value);
    }
  }
}

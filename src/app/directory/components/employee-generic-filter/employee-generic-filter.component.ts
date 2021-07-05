import { Component, EventEmitter, Input, Output } from "@angular/core";

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
})
export class EmployeeGenericFilterComponent {
  @Input() query!: string;
  @Output() clickSearch: EventEmitter<string> = new EventEmitter();
  @Output() clickAdvancedFilters: EventEmitter<void> = new EventEmitter();

  constructor() {}

  get hasValue(): boolean {
    return this.query.length > 0;
  }

  clickSearchHandler(): void {
    this.clickSearch.emit(this.query);
  }

  clickAdvancedFilersHandler(): void {
    this.clickAdvancedFilters.emit();
  }

  clickClearHandler(): void {
    this.query = "";
    this.clickSearch.emit(this.query);
  }

  keyUpInputHandler(event: any): void {
    if (event.keyCode === 13) {
      this.clickSearch.emit(this.query);
    }
  }
}

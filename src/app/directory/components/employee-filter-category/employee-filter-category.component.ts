import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-employee-filter-category',
  templateUrl: './employee-filter-category.component.html',
  styleUrls: ['./employee-filter-category.component.scss']
})
export class EmployeeFilterCategoryComponent implements OnChanges {

  @Input() categoryName!: string;
  @Input() categoryList!: Category[];
  @Input() clearSelection!: boolean;
  @Output() categoryChanges: EventEmitter<Category[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems!: Observable<Category[]>;
  savedItems: Category[] = [];

  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.categoryChanges = new EventEmitter();
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item) => item ? this._filter(item) : this.categoryList));
  }

  ngOnChanges(): void {
    if (this.clearSelection) {
      this.savedItems = [];
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our item
    if (value && !this.existInSavedItems(value)) {
      this.savedItems.push({ name: value });
    }
    // Clear the input value
    event.chipInput!.clear();
    this.itemCtrl.setValue(null);
    this.categoryChanges.emit(this.savedItems);
  }

  private existInSavedItems(value: string): boolean {
    if (!this.savedItems) {
      return false;
    }
    const filterValue = value.toLowerCase();
    return this.savedItems.filter(item => item.name.toLowerCase() === filterValue).length > 0;
  }

  remove(item: Category): void {
    const index = this.savedItems.indexOf(item);
    if (index >= 0) {
      this.savedItems.splice(index, 1);
    }
    this.categoryChanges.emit(this.savedItems);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (event.option.viewValue && !this.existInSavedItems(event.option.viewValue)) {
      this.savedItems.push({ name: event.option.viewValue });
    }
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
    this.categoryChanges.emit(this.savedItems);
  }

  private _filter(value: any): Category[] {
    const filterValue = value.name ? value.name.toLowerCase() : value.toLowerCase();
    return this.categoryList.filter(item => item.name.toLowerCase().includes(filterValue));
  }

}

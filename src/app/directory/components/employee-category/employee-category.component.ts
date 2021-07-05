import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Category } from '@models';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-employee-category',
  templateUrl: './employee-category.component.html',
  styleUrls: ['./employee-category.component.scss']
})
export class EmployeeCategoryComponent implements OnInit {

  @Input() categoryName!: string;
  @Input() categoryList!: Category[]
  @Input() savedItems!: Category[] | undefined;
  @Output() categoryChanges: EventEmitter<Category[]>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems!: Observable<Category[]>;
  isEditionMode!: boolean;
  initialItems!: Category[];

  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.categoryChanges = new EventEmitter();
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item) => item ? this._filter(item) : this.categoryList.slice()));
  }

  ngOnInit(): void {
    if (this.savedItems) {
      this.initialItems = this.savedItems.slice();
    } else {
      this.savedItems = [];
      this.initialItems = [];
    }

  }

  get hasSaveItems(): boolean {
    return this.savedItems !== undefined && this.savedItems.length > 0;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our item
    if (value && this.savedItems && !this.existInSavedItems(value)) {
      this.savedItems.push({ name: value });
    }
    // Clear the input value
    event.chipInput!.clear();
    this.itemCtrl.setValue(null);
  }

  private existInSavedItems(value: string): boolean {
    if (!this.savedItems) {
      return false;
    }
    const filterValue = value.toLowerCase();
    return this.savedItems.filter(item => item.name.toLowerCase() === filterValue).length > 0;
  }

  remove(item: Category): void {
    if (!this.savedItems) {
      return;
    }
    const index = this.savedItems.indexOf(item);
    if (index >= 0) {
      this.savedItems.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (event.option.viewValue && this.savedItems && !this.existInSavedItems(event.option.viewValue)) {
      this.savedItems.push({ name: event.option.viewValue });
    }
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  private _filter(value: any): Category[] {
    console.log(value);
    const filterValue = value.name ? value.name.toLowerCase() : value.toLowerCase();
    return this.categoryList.filter(item => item.name.toLowerCase().includes(filterValue));
  }

  saveItems(): void {
    if (!this.savedItems) {
      return;
    }
    this.isEditionMode = false;
    this.initialItems = this.savedItems.slice();
    this.categoryChanges.emit(this.savedItems);
  }

  restoreItems(): void {
    console.log('HOLAAA SE LLAMA');
    this.savedItems = this.initialItems.slice();
    this.isEditionMode = false;
  }

}

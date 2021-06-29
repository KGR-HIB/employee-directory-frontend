import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-employee-category',
  templateUrl: './employee-category.component.html',
  styleUrls: ['./employee-category.component.scss']
})
export class EmployeeCategoryComponent {

  @Input() categoryName!: string;
  @Input() categoryList!: string[]
  @Input() savedItems!: string[]


  // TODO: definir salida del componente para cuando se de en guardar.
  // definir dos botones (guardar y cancelar)
  // definir tipo genérico de los listados
  // cuando se llegue a la pantalla los chips deben aparecer en modo visualización y al dar en editar sale el input

  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems!: Observable<string[]>;

  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filter(item) : this.categoryList.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our item
    if (value) {
      this.savedItems.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.itemCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.savedItems.indexOf(item);

    if (index >= 0) {
      this.savedItems.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.savedItems.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categoryList.filter(item => item.toLowerCase().includes(filterValue));
  }

}

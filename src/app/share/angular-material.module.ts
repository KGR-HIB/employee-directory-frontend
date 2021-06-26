import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';


const MATERIAL_MODULES = [
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSelectModule,
  MatAutocompleteModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIAL_MODULES,
  ],
  exports: [
    MATERIAL_MODULES
  ]
})
export class AngularMaterialModule { }

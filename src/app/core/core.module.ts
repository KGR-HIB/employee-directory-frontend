import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from './services/user.service';
import { CityService } from './services/city.service';
import { RoleService } from './services/role.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  providers: [
    UserService,
    CityService,
    RoleService
  ],
  declarations: [
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent
  ],
  imports: [
    RouterModule,
    MatIconModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class CoreModule {}
